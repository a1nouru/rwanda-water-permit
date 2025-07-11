import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Permit } from '@/types/database'

interface UsePermitsOptions {
  userId?: string
  filters?: {
    status?: string[]
    expiring_soon?: boolean
  }
  autoFetch?: boolean
}

interface UsePermitsReturn {
  permits: Permit[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  getPermit: (id: string) => Promise<Permit | null>
}

export function usePermits({
  userId,
  filters,
  autoFetch = true
}: UsePermitsOptions = {}): UsePermitsReturn {
  const [permits, setPermits] = useState<Permit[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPermits = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Simple query without complex joins to avoid RLS issues
      let query = supabase
        .from('permits')
        .select('*')

      // Apply filters
      if (filters?.status) {
        query = query.in('status', filters.status)
      }

      if (filters?.expiring_soon) {
        // Get permits expiring in next 30 days
        const thirtyDaysFromNow = new Date()
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
        query = query.lte('expiry_date', thirtyDaysFromNow.toISOString())
      }

      // Order by issue date desc
      query = query.order('issued_date', { ascending: false })

      const { data, error } = await query

      if (error) throw error

      setPermits(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch permits')
      console.error('Error fetching permits:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  const getPermit = useCallback(async (id: string): Promise<Permit | null> => {
    try {
      setError(null)
      const { data, error } = await supabase
        .from('permits')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch permit')
      console.error('Error fetching permit:', err)
      return null
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchPermits()
    }
  }, [fetchPermits, autoFetch])

  return {
    permits,
    loading,
    error,
    refresh: fetchPermits,
    getPermit
  }
} 