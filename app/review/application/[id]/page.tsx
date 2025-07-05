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

// Mock application data
const mockApplication = {
  id: "RWB-24-00123",
  applicantName: "Jane Doe",
  applicantEmail: "jane.doe@example.com",
  applicationType: "Surface Water",
  dateReceived: "2024-06-25",
  status: "submitted",
  slaDeadline: "2024-06-27",
  location: "Kigali, Gasabo District",
  waterSource: "Nyabarongo River",
  intendedUse: "Agricultural Irrigation",
  requestedVolume: "500 cubic meters per day",
  projectDescription: "Establishment of a modern irrigation system for a 50-hectare rice farm. The project aims to increase agricultural productivity and ensure year-round farming capabilities.",
  coordinates: {
    latitude: "-1.9441",
    longitude: "30.0619"
  },
  documents: [
    { name: "Land Title Certificate", type: "PDF", size: "2.3 MB", uploadDate: "2024-06-25" },
    { name: "Technical Drawings", type: "PDF", size: "5.1 MB", uploadDate: "2024-06-25" },
    { name: "Environmental Impact Assessment", type: "PDF", size: "8.7 MB", uploadDate: "2024-06-25" },
    { name: "Project Proposal", type: "PDF", size: "3.2 MB", uploadDate: "2024-06-25" }
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
      <UserProfileButton />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-6"
      >
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Link href="/review">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold tracking-tight">
                Application {mockApplication.id}
              </h1>
              {getStatusBadge(mockApplication.status)}
            </div>
            <p className="text-muted-foreground">
              Submitted by {mockApplication.applicantName} on {mockApplication.dateReceived}
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Name</Label>
                        <p className="text-sm font-medium">{mockApplication.applicantName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-sm font-medium">{mockApplication.applicantEmail}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Application Type</Label>
                        <p className="text-sm font-medium">{mockApplication.applicationType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Location</Label>
                        <p className="text-sm font-medium">{mockApplication.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Water Source</Label>
                        <p className="text-sm font-medium">{mockApplication.waterSource}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Intended Use</Label>
                        <p className="text-sm font-medium">{mockApplication.intendedUse}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Requested Volume</Label>
                        <p className="text-sm font-medium">{mockApplication.requestedVolume}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Coordinates</Label>
                        <p className="text-sm font-medium">
                          {mockApplication.coordinates.latitude}, {mockApplication.coordinates.longitude}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Project Description</Label>
                        <p className="text-sm">{mockApplication.projectDescription}</p>
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
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={handleApproveForInspection}
                      className="w-full"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve for Inspection
                    </Button>
                    
                    <Button 
                      onClick={handleReturnForRevision}
                      variant="outline"
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Return for Revision
                    </Button>

                    <Separator />

                    <div className="space-y-2">
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
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Submitted</p>
                        <p className="text-xs text-muted-foreground">{mockApplication.dateReceived}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-muted"></div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Under Review</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-muted"></div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Inspection</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
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
                <div className="space-y-3">
                  {mockApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {doc.size} • Uploaded {doc.uploadDate}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
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
              <CardContent className="space-y-6">
                {/* Comments Display */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {comment.role}
                          </Badge>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <div className="w-full space-y-2">
                  <Label htmlFor="new-note">Add a new note</Label>
                  <Textarea
                    id="new-note"
                    placeholder="Type your internal note here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end w-full">
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Post Note
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
} 