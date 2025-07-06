import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

// Sample data - replace with actual data fetching
const sampleInspection = {
  id: "INS-24-001",
  permitId: "RWB-24-00123",
  inspectionDate: "2024-03-15",
  inspectorName: "John Doe",
  location: {
    accurate: true,
    actual: "Kigali, Gasabo",
    accessibility: "Easy access via main road"
  },
  project: {
    status: "in_progress",
    matchesApplication: true,
    deviations: "No major deviations noted"
  },
  technical: {
    waterSourceVerified: true,
    extractionMethodVerified: true,
    flowMeasurementVerified: true,
    infrastructureCondition: "good",
    notes: "All technical aspects comply with permit requirements"
  },
  environmental: {
    impact: "minimal",
    mitigationMeasures: true,
    notes: "Proper environmental safeguards in place"
  },
  evidence: {
    photos: true,
    samples: false,
    notes: "Photographic evidence collected of key infrastructure"
  },
  compliance: {
    status: "compliant",
    recommendations: "Continue current practices",
    followUpNeeded: false
  }
}

interface InspectionDetailProps {
  inspectionId: string
}

export function InspectionDetail({ inspectionId }: InspectionDetailProps) {
  // In real implementation, fetch inspection data using inspectionId
  const inspection = sampleInspection

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "minor_issues":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "major_violations":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge variant="default">Compliant</Badge>
      case "minor_issues":
        return <Badge variant="secondary">Minor Issues</Badge>
      case "major_violations":
        return <Badge variant="destructive">Major Violations</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Inspection ID</p>
          <p className="font-medium">{inspection.id}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Permit ID</p>
          <p className="font-medium">{inspection.permitId}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Inspection Date</p>
          <p className="font-medium">{formatDate(inspection.inspectionDate)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Inspector</p>
          <p className="font-medium">{inspection.inspectorName}</p>
        </div>
      </div>

      <Separator />

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle>Location Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className={`h-5 w-5 ${inspection.location.accurate ? 'text-green-500' : 'text-red-500'}`} />
            <span>Location {inspection.location.accurate ? 'matches' : 'does not match'} permit application</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Actual Location</p>
            <p>{inspection.location.actual}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Accessibility Notes</p>
            <p>{inspection.location.accessibility}</p>
          </div>
        </CardContent>
      </Card>

      {/* Project Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Project Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Project Status</p>
              <Badge variant="secondary" className="capitalize">
                {inspection.project.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Matches Application</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className={`h-5 w-5 ${inspection.project.matchesApplication ? 'text-green-500' : 'text-red-500'}`} />
                <span>{inspection.project.matchesApplication ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Deviation Notes</p>
            <p>{inspection.project.deviations}</p>
          </div>
        </CardContent>
      </Card>

      {/* Technical Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Water Source</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className={`h-5 w-5 ${inspection.technical.waterSourceVerified ? 'text-green-500' : 'text-red-500'}`} />
                <span>{inspection.technical.waterSourceVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Extraction Method</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className={`h-5 w-5 ${inspection.technical.extractionMethodVerified ? 'text-green-500' : 'text-red-500'}`} />
                <span>{inspection.technical.extractionMethodVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Flow Measurement</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className={`h-5 w-5 ${inspection.technical.flowMeasurementVerified ? 'text-green-500' : 'text-red-500'}`} />
                <span>{inspection.technical.flowMeasurementVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Infrastructure Condition</p>
              <Badge variant="secondary" className="capitalize">
                {inspection.technical.infrastructureCondition}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Technical Notes</p>
            <p>{inspection.technical.notes}</p>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Environmental Impact</p>
              <Badge variant="secondary" className="capitalize">
                {inspection.environmental.impact}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Mitigation Measures</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className={`h-5 w-5 ${inspection.environmental.mitigationMeasures ? 'text-green-500' : 'text-red-500'}`} />
                <span>{inspection.environmental.mitigationMeasures ? 'In Place' : 'Not in Place'}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Environmental Notes</p>
            <p>{inspection.environmental.notes}</p>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Collection */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence Collection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Photos</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className={`h-5 w-5 ${inspection.evidence.photos ? 'text-green-500' : 'text-red-500'}`} />
                <span>{inspection.evidence.photos ? 'Collected' : 'Not Collected'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Water Samples</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className={`h-5 w-5 ${inspection.evidence.samples ? 'text-green-500' : 'text-red-500'}`} />
                <span>{inspection.evidence.samples ? 'Collected' : 'Not Collected'}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Evidence Notes</p>
            <p>{inspection.evidence.notes}</p>
          </div>
        </CardContent>
      </Card>

      {/* Compliance and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance and Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getStatusIcon(inspection.compliance.status)}
              {getStatusBadge(inspection.compliance.status)}
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className={`h-5 w-5 ${inspection.compliance.followUpNeeded ? 'text-yellow-500' : 'text-green-500'}`} />
              <span>{inspection.compliance.followUpNeeded ? 'Follow-up Required' : 'No Follow-up Needed'}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Recommendations</p>
            <p className="text-sm">{inspection.compliance.recommendations}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 