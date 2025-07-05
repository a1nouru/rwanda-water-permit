"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { UserProfileButton } from "@/components/dashboard/user-profile-button";
import Link from "next/link";

// Mock data for applications in different stages
const mockApplications = [
  {
    id: "RWB-24-00123",
    applicantName: "Jane Doe",
    applicationType: "Surface Water",
    dateReceived: "2024-06-25",
    status: "submitted",
    slaDeadline: "2024-06-27",
    daysRemaining: 2,
  },
  {
    id: "RWB-24-00122",
    applicantName: "XYZ Corporation",
    applicationType: "Groundwater",
    dateReceived: "2024-06-25",
    status: "submitted",
    slaDeadline: "2024-06-27",
    daysRemaining: 2,
  },
  {
    id: "RWB-24-00121",
    applicantName: "ABC Company",
    applicationType: "Groundwater",
    dateReceived: "2024-06-24",
    status: "pending_inspection",
    slaDeadline: "N/A",
    daysRemaining: null,
  },
  {
    id: "RWB-24-00120",
    applicantName: "Peter Jones",
    applicationType: "Surface Water",
    dateReceived: "2024-06-24",
    status: "submitted",
    slaDeadline: "2024-06-26",
    daysRemaining: 1,
  },
  {
    id: "RWB-24-00115",
    applicantName: "John Smith",
    applicationType: "Surface Water",
    dateReceived: "2024-06-20",
    status: "ready_for_final_review",
    slaDeadline: "2024-06-25",
    daysRemaining: -1, // Overdue
  },
  {
    id: "RWB-24-00114",
    applicantName: "Tech Solutions Ltd",
    applicationType: "Industrial Water",
    dateReceived: "2024-06-19",
    status: "needs_revision",
    slaDeadline: "N/A",
    daysRemaining: null,
  },
];

interface Application {
  id: string;
  applicantName: string;
  applicationType: string;
  dateReceived: string;
  status: string;
  slaDeadline: string;
  daysRemaining: number | null;
}

export default function ReviewerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Filter applications based on status
  const newSubmissions = mockApplications.filter(app => app.status === "submitted");
  const pendingInspection = mockApplications.filter(app => app.status === "pending_inspection");
  const readyForFinalReview = mockApplications.filter(app => app.status === "ready_for_final_review");
  const needsRevision = mockApplications.filter(app => app.status === "needs_revision");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { label: "Submitted", variant: "secondary" as const },
      pending_inspection: { label: "Pending Inspection", variant: "outline" as const },
      ready_for_final_review: { label: "Ready for Final Review", variant: "default" as const },
      needs_revision: { label: "Needs Revision", variant: "secondary" as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getSLAStatus = (daysRemaining: number | null) => {
    if (daysRemaining === null) return <span className="text-muted-foreground">N/A</span>;
    if (daysRemaining < 0) return <Badge variant="destructive">Overdue</Badge>;
    if (daysRemaining <= 1) return <Badge variant="outline">Due today</Badge>;
    return <span className="text-muted-foreground">In {daysRemaining} days</span>;
  };

  const filterApplications = (applications: Application[]) => {
    return applications.filter(app => {
      const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || app.applicationType.toLowerCase().includes(filterType.toLowerCase());
      return matchesSearch && matchesType;
    });
  };

  const ApplicationTable = ({ applications, emptyMessage }: { applications: Application[], emptyMessage: string }) => {
    const filteredApps = filterApplications(applications);
    
    if (filteredApps.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          {filteredApps.length === 0 && applications.length > 0 ? "No applications match your filters" : emptyMessage}
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Application ID</TableHead>
            <TableHead>Applicant Name</TableHead>
            <TableHead className="w-[140px]">Type</TableHead>
            <TableHead className="w-[120px]">Date Received</TableHead>
            <TableHead className="w-[130px]">SLA Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApps.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.id}</TableCell>
              <TableCell>{app.applicantName}</TableCell>
              <TableCell>{app.applicationType}</TableCell>
              <TableCell>{app.dateReceived}</TableCell>
              <TableCell>{getSLAStatus(app.daysRemaining)}</TableCell>
              <TableCell>
                <Link href={`/review/application/${app.id}`}>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    {app.status === "submitted" ? "Review" : 
                     app.status === "ready_for_final_review" ? "Final Review" : "View"}
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviewer Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage water permit applications and reviews
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Submissions
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newSubmissions.length}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting initial review
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Inspection
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingInspection.length}</div>
                <p className="text-xs text-muted-foreground">
                  With inspectors
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ready for Final Review
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{readyForFinalReview.length}</div>
                <p className="text-xs text-muted-foreground">
                  Final decision needed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Returned for Revision
                </CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{needsRevision.length}</div>
                <p className="text-xs text-muted-foreground">
                  Pending resubmission
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content with Tabs */}
          <Tabs defaultValue="new_submissions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="new_submissions">New Submissions</TabsTrigger>
              <TabsTrigger value="pending_inspection">Pending Inspection</TabsTrigger>
              <TabsTrigger value="ready_for_final_review">Ready for Final Review</TabsTrigger>
              <TabsTrigger value="all_applications">All Applications</TabsTrigger>
            </TabsList>

            {/* Search and Filter Controls */}
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="surface">Surface Water</SelectItem>
                  <SelectItem value="groundwater">Groundwater</SelectItem>
                  <SelectItem value="industrial">Industrial Water</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tab Contents */}
            <TabsContent value="new_submissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>New Submissions</CardTitle>
                  <CardDescription>
                    Applications waiting for initial documentary review
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationTable 
                    applications={newSubmissions}
                    emptyMessage="No new submissions to review"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending_inspection" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Inspection</CardTitle>
                  <CardDescription>
                    Applications currently assigned to inspectors for site assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationTable 
                    applications={pendingInspection}
                    emptyMessage="No applications pending inspection"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ready_for_final_review" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ready for Final Review</CardTitle>
                  <CardDescription>
                    Applications with completed inspections awaiting final recommendation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationTable 
                    applications={readyForFinalReview}
                    emptyMessage="No applications ready for final review"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all_applications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Applications</CardTitle>
                  <CardDescription>
                    Comprehensive view of all applications assigned to you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationTable 
                    applications={mockApplications}
                    emptyMessage="No applications found"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </DashboardLayout>
  );
} 