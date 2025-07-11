"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Calendar,
  MapPin,
  User,
  FileText,
  AlertTriangle,
  Search,
  Scale,
  Clock,
  TrendingUp,
  Timer
} from "lucide-react";

interface FinalReviewApplication {
  id: string;
  applicantName: string;
  applicantType: "company" | "individual";
  applicationType: string;
  waterSource: string;
  location: string;
  submittedDate: string;
  reviewCompletedDate: string;
  inspectionCompletedDate: string;
  estimatedValue: number;
  assignedReviewer: string;
  assignedInspector: string;
  reviewerRecommendation: "approve" | "reject";
  inspectorRecommendation: "approve" | "reject";
  riskLevel: "low" | "medium" | "high";
  daysInSystem: number;
}

const mockFinalReviewApplications: FinalReviewApplication[] = [
  {
    id: "RWB-24-00158",
    applicantName: "EcoTech Solutions Ltd",
    applicantType: "company",
    applicationType: "Industrial Water Use",
    waterSource: "River",
    location: "Kigali, Kicukiro",
    submittedDate: "2024-03-10",
    reviewCompletedDate: "2024-03-18",
    inspectionCompletedDate: "2024-03-21",
    estimatedValue: 3200000,
    assignedReviewer: "Sarah Johnson",
    assignedInspector: "Michael Brown",
    reviewerRecommendation: "approve",
    inspectorRecommendation: "approve",
    riskLevel: "medium",
    daysInSystem: 13
  },
  {
    id: "RWB-24-00157",
    applicantName: "Rwanda Farms Cooperative",
    applicantType: "company",
    applicationType: "Agricultural Water Use",
    waterSource: "Groundwater",
    location: "Nyagatare, Eastern Province",
    submittedDate: "2024-03-12",
    reviewCompletedDate: "2024-03-19",
    inspectionCompletedDate: "2024-03-22",
    estimatedValue: 1800000,
    assignedReviewer: "Michael Brown",
    assignedInspector: "Alice Wilson",
    reviewerRecommendation: "approve",
    inspectorRecommendation: "approve",
    riskLevel: "low",
    daysInSystem: 11
  },
  {
    id: "RWB-24-00156",
    applicantName: "Mountain View Resort",
    applicantType: "company",
    applicationType: "Commercial Water Use",
    waterSource: "Spring",
    location: "Musanze, Northern Province",
    submittedDate: "2024-03-08",
    reviewCompletedDate: "2024-03-16",
    inspectionCompletedDate: "2024-03-20",
    estimatedValue: 950000,
    assignedReviewer: "Sarah Johnson",
    assignedInspector: "Robert Davis",
    reviewerRecommendation: "reject",
    inspectorRecommendation: "approve",
    riskLevel: "high",
    daysInSystem: 15
  },
  {
    id: "RWB-24-00155",
    applicantName: "Peter Uwimana",
    applicantType: "individual",
    applicationType: "Domestic Water Use",
    waterSource: "Borehole",
    location: "Kigali, Gasabo",
    submittedDate: "2024-03-14",
    reviewCompletedDate: "2024-03-20",
    inspectionCompletedDate: "2024-03-23",
    estimatedValue: 75000,
    assignedReviewer: "Michael Brown",
    assignedInspector: "Alice Wilson",
    reviewerRecommendation: "approve",
    inspectorRecommendation: "approve",
    riskLevel: "low",
    daysInSystem: 9
  }
];

export function FinalDecisions() {
  const [applications, setApplications] = useState(mockFinalReviewApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<FinalReviewApplication | null>(null);
  const [isDecisionDialogOpen, setIsDecisionDialogOpen] = useState(false);
  const [decisionType, setDecisionType] = useState<"approve" | "reject" | null>(null);
  const [decisionReason, setDecisionReason] = useState("");

  const getRiskBadge = (risk: FinalReviewApplication["riskLevel"]) => {
    const riskConfig = {
      low: { label: "Low Risk", variant: "secondary" as const },
      medium: { label: "Medium Risk", variant: "outline" as const },
      high: { label: "High Risk", variant: "destructive" as const }
    };
    const config = riskConfig[risk];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRecommendationBadge = (recommendation: "approve" | "reject") => {
    return recommendation === "approve" 
      ? (
          <Badge variant="default">
            Approve
          </Badge>
        )
      : (
          <Badge variant="destructive">
            Reject
          </Badge>
        );
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === "all" || app.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const handleFinalDecision = (applicationId: string, decision: "approve" | "reject") => {
    // In a real application, this would make an API call
    console.log(`Final decision for ${applicationId}: ${decision}`);
    console.log(`Reason: ${decisionReason}`);
    
    // Remove from pending list (simulate processing)
    setApplications(applications.filter(app => app.id !== applicationId));
    setIsDecisionDialogOpen(false);
    setSelectedApplication(null);
    setDecisionReason("");
  };

  const openDecisionDialog = (application: FinalReviewApplication, decision: "approve" | "reject") => {
    setSelectedApplication(application);
    setDecisionType(decision);
    setIsDecisionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
            Final Approval Decisions
          </h2>
          <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground">
            Applications ready for your final decision after review and inspection
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Decisions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
              Awaiting final approval
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(app => app.riskLevel === "high").length}
            </div>
            <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
              Requires careful review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(applications.reduce((sum, app) => sum + app.daysInSystem, 0) / applications.length)}
            </div>
            <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
              Days in system
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Applications Ready for Final Decision</CardTitle>
          <CardDescription>
            Review completed applications and make final approval decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
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
                  <TableHead className="font-semibold">Recommendations</TableHead>
                  <TableHead>Processing Time</TableHead>
                  <TableHead className="text-right">Final Decision</TableHead>
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
                    <TableCell>
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground tracking-wide">Reviewer</span>
                          {getRecommendationBadge(application.reviewerRecommendation)}
                        </div>
                        <div className="h-px bg-border/50 mx-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground tracking-wide">Inspector</span>
                          {getRecommendationBadge(application.inspectorRecommendation)}
                        </div>
                      </motion.div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{application.daysInSystem} days</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => openDecisionDialog(application, "approve")}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDecisionDialog(application, "reject")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Decision Dialog */}
      <Dialog open={isDecisionDialogOpen} onOpenChange={setIsDecisionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {decisionType === "approve" ? "Approve Application" : "Reject Application"}
            </DialogTitle>
            <DialogDescription>
              {decisionType === "approve" 
                ? "You are about to approve this water permit application. This decision is final."
                : "You are about to reject this water permit application. Please provide a reason."
              }
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Application ID:</span>
                  <p className="leading-relaxed [&:not(:first-child)]:mt-6">{selectedApplication.id}</p>
                </div>
                <div>
                  <span className="font-medium">Applicant:</span>
                  <p className="leading-relaxed [&:not(:first-child)]:mt-6">{selectedApplication.applicantName}</p>
                </div>
                <div>
                  <span className="font-medium">Type:</span>
                  <p className="leading-relaxed [&:not(:first-child)]:mt-6">{selectedApplication.applicationType}</p>
                </div>
                <div>
                  <span className="font-medium">Location:</span>
                  <p className="leading-relaxed [&:not(:first-child)]:mt-6">{selectedApplication.location}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {decisionType === "approve" ? "Approval Notes (Optional)" : "Rejection Reason (Required)"}
                </label>
                <Textarea
                  placeholder={decisionType === "approve" 
                    ? "Add any conditions or notes for the approval..."
                    : "Explain why this application is being rejected..."
                  }
                  value={decisionReason}
                  onChange={(e) => setDecisionReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDecisionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedApplication && handleFinalDecision(selectedApplication.id, decisionType!)}
              disabled={decisionType === "reject" && !decisionReason.trim()}
              variant={decisionType === "approve" ? "default" : "destructive"}
            >
              {decisionType === "approve" ? "Approve Application" : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 