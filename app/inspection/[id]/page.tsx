import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InspectionDetail } from "@/components/inspection/inspection-detail"

export const metadata: Metadata = {
  title: "Inspection Details | Rwanda Water Board",
  description: "View water permit inspection details",
}

export default async function InspectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inspection Details</h1>
        <p className="text-muted-foreground mt-2">
          View detailed inspection report and findings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inspection Report</CardTitle>
          <CardDescription>
            Inspection findings and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InspectionDetail inspectionId={id} />
        </CardContent>
      </Card>
    </div>
  )
} 