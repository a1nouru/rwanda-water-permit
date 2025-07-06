import { Metadata } from "next"
import { InspectionBuilder } from "@/components/inspection/inspection-builder"

export const metadata: Metadata = {
  title: "New Inspection | Rwanda Water Board",
  description: "Create a comprehensive water permit inspection report",
}

export default function NewInspectionPage() {
  return (
    <div className="container mx-auto py-6">
      <InspectionBuilder />
    </div>
  )
} 