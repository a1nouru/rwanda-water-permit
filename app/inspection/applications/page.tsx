"use client"

import { ApplicationsDataTable } from "@/components/inspection/applications-data-table"
import { TypographyH2, TypographyP } from "@/components/ui/typography"

export default function InspectionApplicationsPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="space-y-2">
        <TypographyH2>Applications Pending Inspection</TypographyH2>
        <TypographyP>
          Review and manage water permit applications that require inspection.
        </TypographyP>
      </div>
      <ApplicationsDataTable />
    </div>
  )
} 