"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Send, 
  FileText, 
  MessageSquare, 
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from "lucide-react";
import Link from "next/link";
import { UserProfileButton } from "@/components/dashboard/user-profile-button";

// Mock application data - Enhanced with all form fields
const mockApplication = {
  id: "RWB-24-00123",
  applicantName: "Jane Doe",
  applicantEmail: "jane.doe@example.com",
  applicantPhone: "+250 788 123 456",
  applicantAddress: "KG 15 Ave, Kigali, Rwanda",
  
  // Permit Details
  permitType: "New Permit",
  applicantType: "Agricultural",
  waterSource: "Surface Water",
  purpose: "Agricultural Irrigation",
  waterUsage: 500,
  waterUsageUnit: "m³/day",
  
  // Location Details
  province: "Kigali",
  district: "Gasabo",
  sector: "Remera",
  cell: "Rukiri",
  coordinates: {
    latitude: "-1.9441",
    longitude: "30.0619"
  },
  
  // Project Information
  projectTitle: "Modern Rice Farm Irrigation System",
  projectDescription: "Establishment of a modern irrigation system for a 50-hectare rice farm. The project aims to increase agricultural productivity and ensure year-round farming capabilities through efficient water management and distribution systems.",
  
  // Technical Details
  waterTakingMethod: "Pumping System",
  waterMeasuringMethod: "Flow Meter",
  storageFacilities: "Concrete reservoir with 2,000 m³ capacity",
  storageCapacity: 2000,
  returnFlowQuantity: 100,
  returnFlowQuality: "Treated agricultural runoff meeting environmental standards",
  potentialEffects: "Minimal environmental impact expected. Improved agricultural productivity will benefit local community. Proper drainage systems will prevent waterlogging and maintain soil health.",
  mitigationActions: "Implementation of water-efficient irrigation techniques, regular water quality monitoring, establishment of buffer zones along water sources, and community engagement programs.",
  concessionDuration: "10 years",
  
  // Infrastructure Details
  pipeDetails: "HDPE pipes ranging from 200mm to 400mm diameter, total length 5.2km",
  pumpCapacity: 75,
  valveDetails: "Gate valves at main distribution points, pressure reducing valves for zone control",
  meterDetails: "Electromagnetic flow meters at intake and distribution points",
  backflowControlDevices: "Check valves and air gaps at all connection points",
  
  // Industry-specific fields (if applicable)
  industryType: null,
  industryDetails: null,
  
  // Water Flow Diversion fields (if applicable)
  intakeLocation: "Nyabarongo River - Sector Remera",
  intakeFlow: 500,
  intakeLatitude: "-1.9441",
  intakeLongitude: "30.0619",
  intakeElevation: 1200,
  dischargeLocation: "Agricultural drainage canal",
  dischargeFlow: 100,
  dischargeLatitude: "-1.9450",
  dischargeLongitude: "30.0625",
  dischargeElevation: 1180,
  streamLevelVariations: "Stream level varies between 0.8m (dry season) and 2.5m (wet season). Flow rate ranges from 15 m³/s to 150 m³/s seasonally.",
  diversionStructureConfig: "Concrete intake structure with fish ladder, 3m wide weir with adjustable gates, sediment trap upstream of intake",
  
  // System Details
  dateReceived: "2024-06-25",
  status: "submitted",
  slaDeadline: "2024-06-27",
  location: "Kigali, Gasabo District",
  waterSourceName: "Nyabarongo River",
  intendedUse: "Agricultural Irrigation",
  requestedVolume: "500 cubic meters per day",
  
  documents: [
    { name: "Land Title Certificate", type: "PDF", size: "2.3 MB", uploadDate: "2024-06-25" },
    { name: "Technical Drawings", type: "PDF", size: "5.1 MB", uploadDate: "2024-06-25" },
    { name: "Environmental Impact Assessment", type: "PDF", size: "8.7 MB", uploadDate: "2024-06-25" },
    { name: "Project Proposal", type: "PDF", size: "3.2 MB", uploadDate: "2024-06-25" },
    { name: "Payment Proof", type: "PDF", size: "1.1 MB", uploadDate: "2024-06-25" },
    { name: "Identification Document", type: "PDF", size: "0.8 MB", uploadDate: "2024-06-25" }
  ]
};

// Mock internal comments data
const mockComments = [
  {
    id: 1,
    author: "Olivia Martin",
    role: "Approver",
    avatar: "OM",
    content: "The applicant's technical plan looks solid, but we need to double-check the proposed water volume against the source's capacity during the dry season.",
    timestamp: "2 hours ago",
    createdAt: "2024-06-25T14:30:00Z"
  },
  {
    id: 2,
    author: "John Smith",
    role: "Reviewer",
    avatar: "JS",
    content: "All initial documents are verified and in order. Moving to 'Pending Inspection' and assigning to Inspector Lee.",
    timestamp: "1 day ago",
    createdAt: "2024-06-24T10:15:00Z"
  },
  {
    id: 3,
    author: "Sarah Johnson",
    role: "Inspector",
    avatar: "SJ",
    content: "Scheduled site visit for June 28th. Will verify the coordinates and assess the environmental impact on downstream users.",
    timestamp: "3 hours ago",
    createdAt: "2024-06-25T13:45:00Z"
  }
];

export default function ReviewApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);
  const [selectedAction, setSelectedAction] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: "Current Reviewer", // This would come from auth state
        role: "Reviewer",
        avatar: "CR",
        content: newComment,
        timestamp: "Just now",
        createdAt: new Date().toISOString()
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  const handleApproveForInspection = () => {
    // Handle approve for inspection logic
    alert("Application approved for inspection");
  };

  const handleReturnForRevision = () => {
    // Handle return for revision logic
    alert("Application returned for revision");
  };

  const handleTransferApplication = () => {
    // Handle transfer application logic
    alert("Application transferred");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { label: "Submitted", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      pending_inspection: { label: "Pending Inspection", variant: "outline" as const },
      ready_for_final_review: { label: "Ready for Final Review", variant: "default" as const },
      needs_revision: { label: "Needs Revision", variant: "secondary" as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="flex justify-end p-6">
        <UserProfileButton />
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 pb-8"
        >
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Link href="/review">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
                  Application Review: {mockApplication.id}
                </h1>
                {getStatusBadge(mockApplication.status)}
              </div>
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground">
                Technical review and assessment of water permit application
              </p>
            </div>
          </div>

          {/* Main Content with Tabs */}
          <Tabs defaultValue="application_details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="application_details">Application Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="internal_notes">Internal Notes & History</TabsTrigger>
            </TabsList>

            {/* Application Details Tab */}
            <TabsContent value="application_details" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Application Information */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Applicant Information</CardTitle>
                      <CardDescription>
                        Details about the applicant submitting this water permit request
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                          <p className="text-sm">{mockApplication.applicantName}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                          <p className="text-sm">{mockApplication.applicantEmail}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                          <p className="text-sm">{mockApplication.applicantPhone}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                          <p className="text-sm">{mockApplication.applicantAddress}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Permit Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Permit Details</CardTitle>
                      <CardDescription>
                        Basic permit information and water usage specifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Permit Type</Label>
                          <p className="text-sm">{mockApplication.permitType}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Applicant Type</Label>
                          <p className="text-sm">{mockApplication.applicantType}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Water Source</Label>
                          <p className="text-sm">{mockApplication.waterSource}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Purpose</Label>
                          <p className="text-sm">{mockApplication.purpose}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Water Usage</Label>
                          <p className="text-sm font-medium">{mockApplication.waterUsage} {mockApplication.waterUsageUnit}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Concession Duration</Label>
                          <p className="text-sm">{mockApplication.concessionDuration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Location Details</CardTitle>
                      <CardDescription>
                        Geographic location and administrative boundaries
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Province</Label>
                          <p className="text-sm">{mockApplication.province}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">District</Label>
                          <p className="text-sm">{mockApplication.district}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Sector</Label>
                          <p className="text-sm">{mockApplication.sector}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Cell</Label>
                          <p className="text-sm">{mockApplication.cell}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Coordinates</Label>
                          <p className="text-sm font-mono">
                            {mockApplication.coordinates.latitude}, {mockApplication.coordinates.longitude}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Information</CardTitle>
                      <CardDescription>
                        Detailed project description and objectives
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Project Title</Label>
                          <p className="text-sm font-medium">{mockApplication.projectTitle}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Project Description</Label>
                          <p className="text-sm leading-6">{mockApplication.projectDescription}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Technical Specifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Specifications</CardTitle>
                      <CardDescription>
                        Water extraction, measurement, and storage details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Water Taking Method</Label>
                            <p className="text-sm">{mockApplication.waterTakingMethod}</p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Water Measuring Method</Label>
                            <p className="text-sm">{mockApplication.waterMeasuringMethod}</p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Storage Capacity</Label>
                            <p className="text-sm">{mockApplication.storageCapacity} m³</p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Return Flow Quantity</Label>
                            <p className="text-sm">{mockApplication.returnFlowQuantity} m³/day</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Storage Facilities</Label>
                          <p className="text-sm">{mockApplication.storageFacilities}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Return Flow Quality</Label>
                          <p className="text-sm">{mockApplication.returnFlowQuality}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Infrastructure Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Infrastructure & Equipment</CardTitle>
                      <CardDescription>
                        Pipes, pumps, valves, and monitoring equipment specifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Pump Capacity</Label>
                            <p className="text-sm">{mockApplication.pumpCapacity} m³/h</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Pipe Details</Label>
                          <p className="text-sm">{mockApplication.pipeDetails}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Valve Details</Label>
                          <p className="text-sm">{mockApplication.valveDetails}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Meter Details</Label>
                          <p className="text-sm">{mockApplication.meterDetails}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Backflow Control Devices</Label>
                          <p className="text-sm">{mockApplication.backflowControlDevices}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Water Flow & Diversion Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Water Flow & Diversion</CardTitle>
                      <CardDescription>
                        Intake and discharge locations with flow specifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium">Intake Details</h4>
                            <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Location</Label>
                                <p className="text-sm">{mockApplication.intakeLocation}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Flow Rate</Label>
                                <p className="text-sm">{mockApplication.intakeFlow} m³/day</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Coordinates</Label>
                                <p className="text-xs font-mono">{mockApplication.intakeLatitude}, {mockApplication.intakeLongitude}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Elevation</Label>
                                <p className="text-sm">{mockApplication.intakeElevation}m</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium">Discharge Details</h4>
                            <div className="space-y-3 pl-4 border-l-2 border-green-200">
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Location</Label>
                                <p className="text-sm">{mockApplication.dischargeLocation}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Flow Rate</Label>
                                <p className="text-sm">{mockApplication.dischargeFlow} m³/day</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Coordinates</Label>
                                <p className="text-xs font-mono">{mockApplication.dischargeLatitude}, {mockApplication.dischargeLongitude}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-muted-foreground">Elevation</Label>
                                <p className="text-sm">{mockApplication.dischargeElevation}m</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Stream Level Variations</Label>
                          <p className="text-sm">{mockApplication.streamLevelVariations}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Diversion Structure Configuration</Label>
                          <p className="text-sm">{mockApplication.diversionStructureConfig}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Environmental Impact */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Environmental Impact Assessment</CardTitle>
                      <CardDescription>
                        Potential effects and mitigation measures
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Potential Effects</Label>
                          <p className="text-sm leading-6">{mockApplication.potentialEffects}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Mitigation Actions</Label>
                          <p className="text-sm leading-6">{mockApplication.mitigationActions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Panel */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Actions</CardTitle>
                      <CardDescription>
                        Take action on this application
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <Button 
                          onClick={handleApproveForInspection}
                          className="w-full gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Approve for Inspection
                        </Button>
                        
                        <Button 
                          onClick={handleReturnForRevision}
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <X className="h-4 w-4" />
                          Return for Revision
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Transfer Application</Label>
                        <Select value={selectedAction} onValueChange={setSelectedAction}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reviewer..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reviewer1">John Smith</SelectItem>
                            <SelectItem value="reviewer2">Sarah Johnson</SelectItem>
                            <SelectItem value="reviewer3">Michael Brown</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          onClick={handleTransferApplication}
                          variant="secondary"
                          className="w-full"
                          disabled={!selectedAction}
                        >
                          Transfer Application
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Application Timeline</CardTitle>
                      <CardDescription>
                        Progress through review stages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">Submitted</p>
                            <p className="text-xs text-muted-foreground">{mockApplication.dateReceived}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm text-muted-foreground">Under Review</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm text-muted-foreground">Inspection</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Documents</CardTitle>
                  <CardDescription>
                    Documents submitted with this application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplication.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.type} • {doc.size} • Uploaded {doc.uploadDate}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Internal Notes Tab */}
            <TabsContent value="internal_notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Internal Notes & History</CardTitle>
                  <CardDescription>
                    Comments are visible to all RWB staff
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Comments Display */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <Badge variant="outline" className="text-xs">
                              {comment.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-6">
                  <div className="w-full space-y-4">
                    <Separator />
                    <div className="space-y-3">
                      <Label htmlFor="new-note" className="text-sm font-medium">Add a new note</Label>
                      <Textarea
                        id="new-note"
                        placeholder="Type your internal note here..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Post Note
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 