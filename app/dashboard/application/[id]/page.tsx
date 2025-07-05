"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Download, FileCheck, FileText } from "lucide-react";
import Link from "next/link";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call to fetch application details
    const fetchApplicationDetails = async () => {
      setIsLoading(true);
      
      // Mock data - in a real app, this would be an API call
      setTimeout(() => {
        // Simulate different application data based on ID
        const applicationId = params.id as string;
        let mockApplication;
        
        if (applicationId === "APP-001") {
          mockApplication = {
            id: "APP-001",
            title: "Water Permit Application",
            date: "2023-10-12",
            status: "pending",
            type: "Commercial",
            location: "Kigali, Gasabo",
            permitType: "Water Extraction",
            waterSource: "Groundwater",
            purpose: "Commercial",
            waterUsage: "150 m³/day",
            timeline: [
              { date: "2023-10-12", status: "Submitted", description: "Application submitted successfully" },
              { date: "2023-10-14", status: "In Review", description: "Application is being reviewed by the authority" },
            ],
            documents: [
              { name: "Payment Receipt", type: "pdf", size: "1.2 MB" },
              { name: "Identification Document", type: "pdf", size: "0.8 MB" },
              { name: "Land Ownership Certificate", type: "pdf", size: "1.5 MB" },
              { name: "Technical Drawings", type: "pdf", size: "3.2 MB" },
            ],
          };
        } else if (applicationId === "APP-002") {
          mockApplication = {
            id: "APP-002",
            title: "Water Permit Renewal",
            date: "2023-09-05",
            status: "approved",
            type: "Industrial",
            location: "Musanze, Northern Province",
            permitType: "Industrial Use",
            waterSource: "River",
            purpose: "Industrial",
            waterUsage: "350 m³/day",
            approvalDate: "2023-09-20",
            validUntil: "2025-09-20",
            permitNumber: "WP-2023-09-002",
            timeline: [
              { date: "2023-09-05", status: "Submitted", description: "Application submitted successfully" },
              { date: "2023-09-10", status: "In Review", description: "Application is being reviewed by the authority" },
              { date: "2023-09-18", status: "Final Assessment", description: "Final assessment in progress" },
              { date: "2023-09-20", status: "Approved", description: "Application has been approved" },
            ],
            documents: [
              { name: "Payment Receipt", type: "pdf", size: "1.2 MB" },
              { name: "Previous Permit", type: "pdf", size: "0.9 MB" },
              { name: "Technical Assessment", type: "pdf", size: "2.1 MB" },
              { name: "Approved Permit", type: "pdf", size: "1.7 MB" },
            ],
          };
        } else if (applicationId === "APP-003") {
          mockApplication = {
            id: "APP-003",
            title: "Water Extraction Permit",
            date: "2023-11-20",
            status: "rejected",
            type: "Agricultural",
            location: "Nyagatare, Eastern Province",
            permitType: "Irrigation",
            waterSource: "Lake",
            purpose: "Agricultural",
            waterUsage: "500 m³/day",
            rejectionDate: "2023-12-05",
            rejectionReason: "Insufficient environmental impact assessment. The proposed extraction rate exceeds the sustainable yield for the water source in this area.",
            timeline: [
              { date: "2023-11-20", status: "Submitted", description: "Application submitted successfully" },
              { date: "2023-11-25", status: "In Review", description: "Application is being reviewed by the authority" },
              { date: "2023-12-01", status: "Technical Review", description: "Technical assessment in progress" },
              { date: "2023-12-05", status: "Rejected", description: "Application has been rejected" },
            ],
            documents: [
              { name: "Payment Receipt", type: "pdf", size: "1.2 MB" },
              { name: "Identification Document", type: "pdf", size: "0.8 MB" },
              { name: "Land Ownership Certificate", type: "pdf", size: "1.5 MB" },
              { name: "Environmental Impact Assessment", type: "pdf", size: "4.2 MB" },
              { name: "Rejection Notice", type: "pdf", size: "1.1 MB" },
            ],
          };
        } else {
          // Default generic application
          mockApplication = {
            id: applicationId,
            title: "Water Permit Application",
            date: "2023-10-12",
            status: "pending",
            type: "Unknown",
            location: "Unknown",
            permitType: "Water Extraction",
            waterSource: "Unknown",
            purpose: "Unknown",
            waterUsage: "Unknown",
            timeline: [
              { date: "2023-10-12", status: "Submitted", description: "Application submitted successfully" },
            ],
            documents: [
              { name: "Payment Receipt", type: "pdf", size: "1.2 MB" },
            ],
          };
        }
        
        setApplication(mockApplication);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchApplicationDetails();
  }, [params.id]);
  
  // Function to render the correct status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Function to render status-specific details
  const renderStatusDetails = () => {
    if (!application) return null;
    
    if (application.status === "approved") {
      return (
        <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                <FileCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-400">Permit Approved</h3>
                <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                  Your water permit has been approved and is valid until {application.validUntil}.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Permit Number</p>
                    <p className="font-medium">{application.permitNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Approval Date</p>
                    <p className="font-medium">{application.approvalDate}</p>
                  </div>
                </div>
                <Button className="mt-4" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Permit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    } else if (application.status === "rejected") {
      return (
        <Card className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
                <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-red-800 dark:text-red-400">Application Rejected</h3>
                <p className="text-sm text-red-700 dark:text-red-500 mt-1">
                  Your application was rejected on {application.rejectionDate}.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Reason for Rejection</p>
                  <p className="text-sm mt-1">{application.rejectionReason}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Notice
                  </Button>
                  <Button size="sm">Reapply</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    } else if (application.status === "pending") {
      return (
        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400">Application Under Review</h3>
                <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                  Your application is currently being reviewed by our team. We will notify you of any updates.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Estimated Processing Time</p>
                  <p className="font-medium">7-14 business days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    return null;
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!application) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Application Not Found</h2>
            <p className="text-muted-foreground mt-2">The application you are looking for does not exist or has been removed.</p>
            <Button asChild className="mt-6">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Applications
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{application.title}</h1>
              {getStatusBadge(application.status)}
            </div>
            <p className="text-muted-foreground">
              Application ID: {application.id} • Submitted on {formatDate(application.date)}
            </p>
          </div>
          
          {renderStatusDetails()}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Details</CardTitle>
                  <CardDescription>Details of your water permit application</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Permit Type</dt>
                      <dd className="mt-1">{application.permitType}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Water Source</dt>
                      <dd className="mt-1">{application.waterSource}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Purpose</dt>
                      <dd className="mt-1">{application.purpose}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Water Usage</dt>
                      <dd className="mt-1">{application.waterUsage}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                      <dd className="mt-1">{application.location}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                  <CardDescription>Application processing timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6">
                    {application.timeline.map((event: any, index: number) => (
                      <li key={index} className="relative flex gap-6">
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary ring-1 ring-primary ring-offset-2"></div>
                          {index !== application.timeline.length - 1 && (
                            <div className="absolute left-2.5 top-3 h-full w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                          )}
                        </div>
                        <div className="flex-auto py-0.5 text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">{event.status}</span>
                          <p className="text-muted-foreground">{event.description}</p>
                          <time className="mt-1 text-xs text-muted-foreground">{event.date}</time>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submitted Documents</CardTitle>
                  <CardDescription>Documents attached to your application</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {application.documents.map((doc: any, index: number) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                          <span>{doc.name}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2">{doc.size}</span>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>Contact our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions or need assistance with your application, please contact our support team.
                  </p>
                  <Button className="w-full">Contact Support</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 