"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Calendar,
  MapPin,
  User,
  TrendingUp,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Application {
  id: string;
  applicantName: string;
  applicantType: "company" | "individual";
  applicationType: string;
  waterSource: string;
  location: string;
  status: "submitted" | "under_review" | "pending_inspection" | "approved" | "rejected" | "revision_required";
  submittedDate: string;
  lastUpdated: string;
  assignedReviewer?: string;
  assignedInspector?: string;
  slaStatus: "on_time" | "due_soon" | "overdue";
  daysRemaining: number;
  estimatedValue: number;
}

// Mock application data for admin oversight
const mockApplications: Application[] = [
  {
    id: "RWB-24-00156",
    applicantName: "John Smith",
    applicantType: "individual",
    applicationType: "Domestic Water Use",
    waterSource: "Borehole",
    location: "Kigali, Gasabo",
    status: "submitted",
    submittedDate: "2024-03-22",
    lastUpdated: "2024-03-22",
    slaStatus: "on_time",
    daysRemaining: 12,
    estimatedValue: 50000
  },
  {
    id: "RWB-24-00155",
    applicantName: "Green Industries Ltd",
    applicantType: "company",
    applicationType: "Industrial Water Use",
    waterSource: "Surface Water",
    location: "Musanze, Northern Province",
    status: "under_review",
    submittedDate: "2024-03-18",
    lastUpdated: "2024-03-21",
    assignedReviewer: "Sarah Johnson",
    slaStatus: "due_soon",
    daysRemaining: 2,
    estimatedValue: 2500000
  },
  {
    id: "RWB-24-00154",
    applicantName: "AgriTech Solutions",
    applicantType: "company",
    applicationType: "Agricultural Water Use",
    waterSource: "River",
    location: "Nyagatare, Eastern Province",
    status: "pending_inspection",
    submittedDate: "2024-03-15",
    lastUpdated: "2024-03-20",
    assignedReviewer: "Michael Brown",
    assignedInspector: "Alice Wilson",
    slaStatus: "on_time",
    daysRemaining: 5,
    estimatedValue: 1800000
  },
  {
    id: "RWB-24-00153",
    applicantName: "City Water Corp",
    applicantType: "company",
    applicationType: "Municipal Water Supply",
    waterSource: "Lake",
    location: "Kigali, Nyarugenge",
    status: "approved",
    submittedDate: "2024-03-10",
    lastUpdated: "2024-03-21",
    assignedReviewer: "Sarah Johnson",
    assignedInspector: "Robert Davis",
    slaStatus: "on_time",
    daysRemaining: 0,
    estimatedValue: 5000000
  },
  {
    id: "RWB-24-00152",
    applicantName: "Mining Co Ltd",
    applicantType: "company",
    applicationType: "Mining Water Use",
    waterSource: "Groundwater",
    location: "Rusizi, Western Province",
    status: "revision_required",
    submittedDate: "2024-03-05",
    lastUpdated: "2024-03-19",
    assignedReviewer: "Michael Brown",
    slaStatus: "overdue",
    daysRemaining: -3,
    estimatedValue: 3200000
  }
];

export function ApplicationOversight() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSLA, setFilterSLA] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const getStatusBadge = (status: Application["status"]) => {
    const statusConfig = {
      submitted: { label: "Submitted", variant: "secondary" as const, icon: FileText },
      under_review: { label: "Under Review", variant: "default" as const, icon: Eye },
      pending_inspection: { label: "Pending Inspection", variant: "outline" as const, icon: Clock },
      approved: { label: "Approved", variant: "default" as const, icon: CheckCircle },
      rejected: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
      revision_required: { label: "Revision Required", variant: "secondary" as const, icon: AlertTriangle }
    };
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };



  const getSLABadge = (slaStatus: Application["slaStatus"], daysRemaining: number) => {
    if (slaStatus === "overdue") {
      return <Badge variant="destructive">Overdue ({Math.abs(daysRemaining)} days)</Badge>;
    } else if (slaStatus === "due_soon") {
      return <Badge variant="outline">Due in {daysRemaining} days</Badge>;
    } else {
      return <Badge variant="secondary">{daysRemaining} days left</Badge>;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesSLA = filterSLA === "all" || app.slaStatus === filterSLA;
    return matchesSearch && matchesStatus && matchesSLA;
  });

  const handleReassignApplication = (applicationId: string, newReviewer: string) => {
    setApplications(applications.map(app => 
      app.id === applicationId 
        ? { ...app, assignedReviewer: newReviewer, lastUpdated: new Date().toISOString().split('T')[0] }
        : app
    ));
  };

  const totalValue = applications.reduce((sum, app) => sum + app.estimatedValue, 0);
  const avgProcessingTime = 12.5; // Mock data

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              Active in system
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.slaStatus === "overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalValue / 1000000).toFixed(1)}M RWF
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated project value
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProcessingTime} days</div>
            <p className="text-xs text-muted-foreground">
              Current average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Application Oversight</CardTitle>
              <CardDescription>
                Monitor and manage all water permit applications across the system
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="pending_inspection">Pending Inspection</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="revision_required">Revision Required</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSLA} onValueChange={setFilterSLA}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="SLA Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All SLA</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="due_soon">Due Soon</SelectItem>
                <SelectItem value="on_time">On Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Type & Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Staff</TableHead>
                  <TableHead>SLA Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.id}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {application.submittedDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.applicantName}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {application.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{application.applicationType}</div>
                        <div className="text-xs text-muted-foreground">{application.waterSource}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {application.assignedReviewer && (
                          <div className="text-sm flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {application.assignedReviewer}
                          </div>
                        )}
                        {application.assignedInspector && (
                          <div className="text-xs text-muted-foreground">
                            Inspector: {application.assignedInspector}
                          </div>
                        )}
                        {!application.assignedReviewer && !application.assignedInspector && (
                          <div className="text-xs text-muted-foreground">Unassigned</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getSLABadge(application.slaStatus, application.daysRemaining)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {(application.estimatedValue / 1000000).toFixed(1)}M RWF
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedApplication(application)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleReassignApplication(application.id, "New Reviewer")}>
                            <User className="mr-2 h-4 w-4" />
                            Reassign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Application Details - {selectedApplication.id}</DialogTitle>
              <DialogDescription>
                Comprehensive view of application information and status
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Applicant Information</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Name: {selectedApplication.applicantName}</p>
                    <p>Type: {selectedApplication.applicantType}</p>
                    <p>Location: {selectedApplication.location}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Application Details</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Type: {selectedApplication.applicationType}</p>
                    <p>Water Source: {selectedApplication.waterSource}</p>
                    <p>Estimated Value: {(selectedApplication.estimatedValue / 1000000).toFixed(1)}M RWF</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Status & Timeline</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Current Status: {getStatusBadge(selectedApplication.status)}</p>
                    <p>Submitted: {selectedApplication.submittedDate}</p>
                    <p>Last Updated: {selectedApplication.lastUpdated}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Assignment & SLA</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Reviewer: {selectedApplication.assignedReviewer || "Unassigned"}</p>
                    <p>Inspector: {selectedApplication.assignedInspector || "Not assigned"}</p>
                    <p>SLA Status: {getSLABadge(selectedApplication.slaStatus, selectedApplication.daysRemaining)}</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 