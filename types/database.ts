// =============================================
// Rwanda Water Board Database Types
// Generated from PostgreSQL Schema
// =============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// =============================================
// ENUMS
// =============================================

export type UserRole = 'applicant' | 'reviewer' | 'inspector' | 'admin' | 'approver'
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type AccountType = 'individual' | 'company'
export type IdType = 'national_id' | 'passport' | 'driving_license'

export type ApplicationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'pending_inspection'
  | 'approved' 
  | 'rejected' 
  | 'revision_required' 
  | 'cancelled'

export type ApplicationType = 
  | 'domestic' 
  | 'industrial' 
  | 'agricultural' 
  | 'commercial'
  | 'municipal' 
  | 'mining_water_use'

export type WaterSourceType = 
  | 'borehole' 
  | 'surface_water' 
  | 'river' 
  | 'groundwater'
  | 'lake' 
  | 'spring' 
  | 'other'

export type WaterPurpose = 
  | 'domestic' 
  | 'irrigation' 
  | 'industrial' 
  | 'livestock'
  | 'aquaculture' 
  | 'recreation' 
  | 'electricity_generation'
  | 'mining' 
  | 'municipal_supply' 
  | 'other'

export type SlaStatus = 'on_time' | 'due_soon' | 'overdue'

export type PermitStatus = 'active' | 'expired' | 'expiring_soon' | 'suspended' | 'revoked'

export type DocumentType = 
  | 'payment_proof' 
  | 'identification_doc' 
  | 'land_ownership_doc'
  | 'technical_drawings' 
  | 'environmental_impact_doc' 
  | 'intake_discharge_map'
  | 'water_quality_report' 
  | 'geological_survey' 
  | 'business_license'
  | 'other'

export type VerificationStatus = 'pending' | 'verified' | 'rejected'

export type InspectionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
export type InspectionType = 'initial' | 'follow_up' | 'annual' | 'complaint' | 'renewal'
export type InspectionResult = 'passed' | 'failed' | 'conditional'

export type RiskAssessment = 'low' | 'medium' | 'high'
export type RecommendationType = 'approve' | 'reject' | 'require_revision' | 'require_inspection'

export type ProvinceType = 'Kigali' | 'Northern' | 'Southern' | 'Eastern' | 'Western'

// =============================================
// MAIN INTERFACES
// =============================================

export interface User {
  id: string
  email: string
  phone?: string
  role: UserRole
  status: UserStatus
  account_type: AccountType
  
  // Individual fields
  first_name?: string
  last_name?: string
  date_of_birth?: string
  id_number?: string
  id_type?: IdType
  
  // Company fields
  company_name?: string
  company_tin?: string
  company_address?: string
  company_phone?: string
  
  // Location information
  province?: ProvinceType
  district?: string
  sector?: string
  cell?: string
  village?: string
  address?: string
  
  // Activity tracking
  applications_count: number
  reviews_count: number
  inspections_count: number
  
  // Audit fields
  created_at: string
  updated_at: string
  last_login_at?: string
  
  // Profile completion
  profile_completed: boolean
}

export interface Application {
  id: string
  applicant_id: string
  
  // Application metadata
  application_number?: string
  status: ApplicationStatus
  application_type: ApplicationType
  
  // Water permit details
  water_source: WaterSourceType
  water_purpose: WaterPurpose
  estimated_usage_volume?: number
  usage_unit?: string
  
  // Location details
  province: ProvinceType
  district: string
  sector: string
  cell: string
  village?: string
  coordinates?: Json // PostGIS geometry
  location_description?: string
  
  // Project information
  project_title: string
  project_description?: string
  project_value?: number
  
  // Technical specifications
  water_taking_method?: string
  water_measuring_method?: string
  storage_facilities?: string
  return_flow_description?: string
  
  // Industry-specific fields
  electricity_generation_capacity?: string
  mining_operations_type?: string
  water_diversion_details?: string
  
  // Infrastructure details
  infrastructure_pipes?: string
  infrastructure_pumps?: string
  infrastructure_valves?: string
  infrastructure_meters?: string
  
  // Environmental information
  environmental_assessment?: string
  mitigation_actions?: string
  
  // Assignment tracking
  assigned_reviewer_id?: string
  assigned_inspector_id?: string
  assigned_approver_id?: string
  
  // SLA tracking
  sla_status: SlaStatus
  due_date?: string
  
  // Workflow timestamps
  submitted_at?: string
  reviewed_at?: string
  inspected_at?: string
  approved_at?: string
  
  // Audit fields
  created_at: string
  updated_at: string
  
  // Additional metadata
  revision_notes?: string
  rejection_reason?: string
  internal_notes?: string
}

export interface Permit {
  id: string
  application_id: string
  permit_number: string
  
  // Permit details
  status: PermitStatus
  water_source: WaterSourceType
  purpose: WaterPurpose
  water_allowance: number
  allowance_unit: string
  
  // Authority and validity
  issuing_authority: string
  issued_date: string
  expiry_date: string
  
  // Conditions and restrictions
  conditions?: Json
  
  // Transfer and renewal history
  original_permit_id?: string
  is_renewal: boolean
  is_transfer: boolean
  transfer_reason?: string
  
  // Monitoring requirements
  monitoring_frequency?: string
  reporting_requirements?: string
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  application_id?: string
  permit_id?: string
  inspection_id?: string
  
  // Document details
  name: string
  type: DocumentType
  file_path?: string
  file_size?: number
  mime_type?: string
  
  // Verification
  verification_status: VerificationStatus
  verified_by?: string
  verified_at?: string
  verification_notes?: string
  
  // Requirements
  is_required: boolean
  
  // Upload information
  uploaded_by: string
  upload_date: string
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface Inspection {
  id: string
  application_id: string
  inspector_id: string
  
  // Inspection metadata
  inspection_number?: string
  type: InspectionType
  status: InspectionStatus
  result?: InspectionResult
  
  // Scheduling
  scheduled_date: string
  completed_date?: string
  
  // Location verification
  location_verified?: boolean
  coordinates_verified?: boolean
  site_plan_compliance?: boolean
  location_notes?: string
  
  // Technical verification
  water_source_verified?: boolean
  extraction_method_verified?: boolean
  infrastructure_condition?: string
  technical_compliance?: boolean
  technical_notes?: string
  
  // Environmental compliance
  environmental_impact_assessed?: boolean
  mitigation_measures_implemented?: boolean
  environmental_compliance?: boolean
  environmental_notes?: string
  
  // Regulatory compliance
  permit_conditions_met?: boolean
  volume_limits_respected?: boolean
  reporting_up_to_date?: boolean
  fees_paid?: boolean
  regulatory_compliance?: boolean
  regulatory_notes?: string
  
  // Evidence collection
  photos_taken: number
  samples_collected: number
  gps_data?: Json
  
  // Inspector findings
  overall_score?: number
  recommendations?: string
  follow_up_required: boolean
  follow_up_date?: string
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  application_id: string
  reviewer_id: string
  
  // Review details
  review_stage: string
  status: string
  
  // Assessment
  risk_assessment?: RiskAssessment
  recommendation?: RecommendationType
  
  // Review content
  technical_review?: string
  environmental_review?: string
  compliance_review?: string
  overall_comments?: string
  
  // Decision timeline
  assigned_at: string
  completed_at?: string
  due_date?: string
  
  // Quality metrics
  quality_score?: number
  processing_time_hours?: number
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface Approval {
  id: string
  application_id: string
  approver_id: string
  
  // Approval details
  decision: string
  decision_reason?: string
  conditions?: Json
  
  // Delegation
  delegated_from?: string
  delegation_reason?: string
  
  // Timeline
  approved_at: string
  effective_date?: string
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface WorkflowHistory {
  id: string
  application_id: string
  user_id?: string
  
  // Change details
  from_status?: string
  to_status: string
  action: string
  comment?: string
  
  // Metadata
  ip_address?: string
  user_agent?: string
  
  // Audit fields
  created_at: string
}

export interface Communication {
  id: string
  application_id?: string
  inspection_id?: string
  
  // Communication details
  sender_id: string
  recipient_id?: string
  message_type: string
  subject?: string
  message: string
  
  // Status
  is_internal: boolean
  is_read: boolean
  read_at?: string
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  
  // Notification details
  title: string
  message: string
  type: string
  
  // Related entities
  application_id?: string
  inspection_id?: string
  
  // Status
  is_read: boolean
  read_at?: string
  
  // Delivery settings
  email_sent: boolean
  sms_sent: boolean
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface SystemSetting {
  id: string
  key: string
  value: Json
  description?: string
  category?: string
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  
  // Notification preferences
  email_notifications: boolean
  sms_notifications: boolean
  application_updates: boolean
  inspection_reminders: boolean
  system_announcements: boolean
  
  // UI preferences
  theme: string
  language: string
  timezone: string
  
  // Dashboard preferences
  dashboard_layout?: Json
  
  // Audit fields
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id?: string
  
  // Action details
  action: string
  table_name?: string
  record_id?: string
  old_values?: Json
  new_values?: Json
  
  // Request details
  ip_address?: string
  user_agent?: string
  request_id?: string
  
  // Audit fields
  created_at: string
}

// =============================================
// HELPER TYPES AND INTERFACES
// =============================================

// For form inputs and API responses
export interface ApplicationFormData extends Omit<Application, 'id' | 'created_at' | 'updated_at' | 'applicant_id' | 'application_number' | 'status' | 'submitted_at' | 'reviewed_at' | 'inspected_at' | 'approved_at'> {
  // These fields will be set by the system
}

export interface ApplicationWithRelations extends Application {
  applicant?: User
  assigned_reviewer?: User
  assigned_inspector?: User
  assigned_approver?: User
  documents?: Document[]
  reviews?: Review[]
  inspections?: Inspection[]
  permits?: Permit[]
  workflow_history?: WorkflowHistory[]
  communications?: Communication[]
}

export interface UserWithRelations extends User {
  applications?: Application[]
  reviews?: Review[]
  inspections?: Inspection[]
  approvals?: Approval[]
  preferences?: UserPreferences
}

export interface PermitWithRelations extends Permit {
  application?: Application
  documents?: Document[]
}

export interface InspectionWithRelations extends Inspection {
  application?: Application
  inspector?: User
  documents?: Document[]
}

// Dashboard and statistics types
export interface DashboardStats {
  total_applications: number
  pending_review: number
  pending_inspection: number
  approved_this_month: number
  active_permits: number
  expiring_permits: number
  overdue_applications: number
  user_applications?: number
}

export interface ApplicationStats {
  by_status: Record<ApplicationStatus, number>
  by_type: Record<ApplicationType, number>
  by_province: Record<ProvinceType, number>
  processing_times: {
    average_days: number
    median_days: number
    fastest_days: number
    slowest_days: number
  }
}

// Search and filter types
export interface ApplicationFilters {
  status?: ApplicationStatus[]
  type?: ApplicationType[]
  province?: ProvinceType[]
  district?: string[]
  water_source?: WaterSourceType[]
  sla_status?: SlaStatus[]
  assigned_reviewer_id?: string
  assigned_inspector_id?: string
  date_range?: {
    from: string
    to: string
  }
}

export interface SearchParams {
  query?: string
  filters?: ApplicationFilters
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
  pagination?: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface ApiError {
  message: string
  code?: string
  status: number
  details?: Record<string, any>
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
  code?: string
}

export interface FormState<T> {
  data: T
  errors: ValidationError[]
  isLoading: boolean
  isValid: boolean
}

// Notification types for UI
export interface UINotification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  actions?: Array<{
    label: string
    action: () => void
  }>
}

// =============================================
// SUPABASE DATABASE TYPE
// =============================================

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      applications: {
        Row: Application
        Insert: Omit<Application, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Application, 'id' | 'created_at' | 'updated_at'>>
      }
      permits: {
        Row: Permit
        Insert: Omit<Permit, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Permit, 'id' | 'created_at' | 'updated_at'>>
      }
      documents: {
        Row: Document
        Insert: Omit<Document, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Document, 'id' | 'created_at' | 'updated_at'>>
      }
      inspections: {
        Row: Inspection
        Insert: Omit<Inspection, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Inspection, 'id' | 'created_at' | 'updated_at'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Review, 'id' | 'created_at' | 'updated_at'>>
      }
      approvals: {
        Row: Approval
        Insert: Omit<Approval, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Approval, 'id' | 'created_at' | 'updated_at'>>
      }
      workflow_history: {
        Row: WorkflowHistory
        Insert: Omit<WorkflowHistory, 'id' | 'created_at'>
        Update: Partial<Omit<WorkflowHistory, 'id' | 'created_at'>>
      }
      communications: {
        Row: Communication
        Insert: Omit<Communication, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Communication, 'id' | 'created_at' | 'updated_at'>>
      }
      notifications: {
        Row: Notification
        Insert: Omit<Notification, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Notification, 'id' | 'created_at' | 'updated_at'>>
      }
      system_settings: {
        Row: SystemSetting
        Insert: Omit<SystemSetting, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<SystemSetting, 'id' | 'created_at' | 'updated_at'>>
      }
      user_preferences: {
        Row: UserPreferences
        Insert: Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>>
      }
      audit_logs: {
        Row: AuditLog
        Insert: Omit<AuditLog, 'id' | 'created_at'>
        Update: Partial<Omit<AuditLog, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      user_status: UserStatus
      account_type: AccountType
      id_type: IdType
      application_status: ApplicationStatus
      application_type: ApplicationType
      water_source_type: WaterSourceType
      water_purpose: WaterPurpose
      sla_status: SlaStatus
      permit_status: PermitStatus
      document_type: DocumentType
      verification_status: VerificationStatus
      inspection_status: InspectionStatus
      inspection_type: InspectionType
      inspection_result: InspectionResult
      risk_assessment: RiskAssessment
      recommendation_type: RecommendationType
      province_type: ProvinceType
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// All types are already exported above as individual exports 