"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  FileText, 
  Users, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
  BookOpen,
  Gavel,
  Globe,
  UserCheck,
  Plus,
  Edit,
  Eye
} from "lucide-react";

interface Policy {
  id: string;
  title: string;
  category: "regulatory" | "operational" | "environmental" | "compliance";
  status: "active" | "draft" | "under_review" | "archived";
  version: string;
  lastUpdated: string;
  nextReview: string;
  owner: string;
  applicationsAffected: number;
}

interface Regulation {
  id: string;
  title: string;
  type: "national" | "international" | "institutional";
  status: "current" | "pending" | "superseded";
  effectiveDate: string;
  complianceLevel: number;
  description: string;
}

interface Delegation {
  id: string;
  delegatedTo: string;
  role: string;
  permissions: string[];
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "revoked";
  reason: string;
}

const mockPolicies: Policy[] = [
  {
    id: "POL-001",
    title: "Water Permit Assessment Guidelines",
    category: "operational",
    status: "active",
    version: "2.1",
    lastUpdated: "2024-02-15",
    nextReview: "2024-08-15",
    owner: "Technical Department",
    applicationsAffected: 234
  },
  {
    id: "POL-002",
    title: "Environmental Impact Assessment Standards",
    category: "environmental",
    status: "under_review",
    version: "1.8",
    lastUpdated: "2024-01-20",
    nextReview: "2024-07-20",
    owner: "Environmental Unit",
    applicationsAffected: 89
  },
  {
    id: "POL-003",
    title: "Industrial Water Use Compliance Framework",
    category: "compliance",
    status: "active",
    version: "3.0",
    lastUpdated: "2024-03-01",
    nextReview: "2024-09-01",
    owner: "Compliance Team",
    applicationsAffected: 156
  },
  {
    id: "POL-004",
    title: "Emergency Water Allocation Procedures",
    category: "regulatory",
    status: "draft",
    version: "1.0",
    lastUpdated: "2024-03-10",
    nextReview: "2024-06-10",
    owner: "Emergency Response",
    applicationsAffected: 0
  }
];

const mockRegulations: Regulation[] = [
  {
    id: "REG-001",
    title: "Rwanda Water Resources Management Law",
    type: "national",
    status: "current",
    effectiveDate: "2023-01-01",
    complianceLevel: 98.5,
    description: "National framework for water resource management and allocation"
  },
  {
    id: "REG-002", 
    title: "Environmental Protection Standards",
    type: "national",
    status: "current",
    effectiveDate: "2022-07-01",
    complianceLevel: 96.2,
    description: "Environmental protection requirements for water use permits"
  },
  {
    id: "REG-003",
    title: "UN Sustainable Development Goals - Water",
    type: "international",
    status: "current",
    effectiveDate: "2015-09-25",
    complianceLevel: 94.8,
    description: "International commitments to water sustainability"
  }
];

const mockDelegations: Delegation[] = [
  {
    id: "DEL-001",
    delegatedTo: "Dr. Sarah Johnson",
    role: "Deputy Director",
    permissions: ["approve_applications_under_5M", "review_policies", "staff_management"],
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    status: "active",
    reason: "Official travel to Water Summit"
  },
  {
    id: "DEL-002",
    delegatedTo: "Mr. Michael Brown",
    role: "Senior Technical Advisor",
    permissions: ["technical_decisions", "inspection_approval"],
    startDate: "2024-02-20",
    endDate: "2024-03-20",
    status: "expired",
    reason: "Medical leave coverage"
  }
];

export function GovernanceManagement() {
  const [selectedTab, setSelectedTab] = useState("policies");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isNewPolicyOpen, setIsNewPolicyOpen] = useState(false);
  const [isNewDelegationOpen, setIsNewDelegationOpen] = useState(false);

  const getPolicyStatusBadge = (status: Policy["status"]) => {
    const statusConfig = {
      active: { label: "Active", variant: "default" as const },
      draft: { label: "Draft", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "outline" as const },
      archived: { label: "Archived", variant: "destructive" as const }
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRegulationStatusBadge = (status: Regulation["status"]) => {
    const statusConfig = {
      current: { label: "Current", variant: "default" as const },
      pending: { label: "Pending", variant: "outline" as const },
      superseded: { label: "Superseded", variant: "secondary" as const }
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getDelegationStatusBadge = (status: Delegation["status"]) => {
    const statusConfig = {
      active: { label: "Active", variant: "default" as const },
      expired: { label: "Expired", variant: "secondary" as const },
      revoked: { label: "Revoked", variant: "destructive" as const }
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
            Governance & Policy Management
          </h2>
          <p className="text-muted-foreground">
            Institutional policies, regulations, and authority delegation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Institutional Governance</span>
        </div>
      </div>

      {/* Governance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPolicies.filter(p => p.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockPolicies.filter(p => p.status === "under_review").length} under review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(mockRegulations.reduce((sum, reg) => sum + reg.complianceLevel, 0) / mockRegulations.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Regulatory compliance
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Delegations</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDelegations.filter(d => d.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Authority delegations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Reviews</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockPolicies.filter(p => new Date(p.nextReview) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Next 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setSelectedTab("policies")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "policies"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Policies & Procedures
          </button>
          <button
            onClick={() => setSelectedTab("regulations")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "regulations"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Regulatory Framework
          </button>
          <button
            onClick={() => setSelectedTab("delegations")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "delegations"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Authority Delegation
          </button>
        </nav>
      </div>

      {/* Policies Tab */}
      {selectedTab === "policies" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Institutional Policies</CardTitle>
                <CardDescription>
                  Manage organizational policies and procedures
                </CardDescription>
              </div>
              <Dialog open={isNewPolicyOpen} onOpenChange={setIsNewPolicyOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Policy
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Policy</DialogTitle>
                    <DialogDescription>
                      Add a new institutional policy or procedure
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Policy Title</label>
                      <Input placeholder="Enter policy title" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regulatory">Regulatory</SelectItem>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="environmental">Environmental</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Policy description and objectives" rows={3} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewPolicyOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsNewPolicyOpen(false)}>
                      Create Policy
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPolicies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{policy.title}</div>
                          <div className="text-sm text-muted-foreground">{policy.id}</div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{policy.category}</TableCell>
                      <TableCell>{getPolicyStatusBadge(policy.status)}</TableCell>
                      <TableCell>{policy.version}</TableCell>
                      <TableCell>
                        <div className="text-sm">{policy.nextReview}</div>
                        {new Date(policy.nextReview) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                          <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                            Due Soon
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{policy.applicationsAffected} applications</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
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
      )}

      {/* Regulations Tab */}
      {selectedTab === "regulations" && (
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Framework</CardTitle>
            <CardDescription>
              Monitor compliance with national and international regulations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRegulations.map((regulation) => (
                <div key={regulation.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{regulation.title}</h3>
                        {getRegulationStatusBadge(regulation.status)}
                        <Badge variant="outline" className="text-xs">
                          {regulation.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {regulation.description}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Effective: {regulation.effectiveDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {regulation.complianceLevel}%
                        </div>
                        <div className="text-xs text-muted-foreground">Compliance</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {regulation.type === "international" ? (
                          <Globe className="h-4 w-4 text-blue-600" />
                        ) : regulation.type === "national" ? (
                          <Gavel className="h-4 w-4 text-green-600" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delegations Tab */}
      {selectedTab === "delegations" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Authority Delegation</CardTitle>
                <CardDescription>
                  Manage temporary delegation of executive authority
                </CardDescription>
              </div>
              <Dialog open={isNewDelegationOpen} onOpenChange={setIsNewDelegationOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Delegation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delegate Authority</DialogTitle>
                    <DialogDescription>
                      Temporarily delegate executive authority to another staff member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Delegate To</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">Dr. Sarah Johnson - Deputy Director</SelectItem>
                          <SelectItem value="michael">Mr. Michael Brown - Senior Advisor</SelectItem>
                          <SelectItem value="alice">Ms. Alice Wilson - Technical Lead</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Permissions</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Approve applications under 5M RWF</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Review and update policies</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Staff management decisions</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reason for Delegation</label>
                      <Textarea placeholder="Explain the reason for this delegation" rows={2} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewDelegationOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsNewDelegationOpen(false)}>
                      Create Delegation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDelegations.map((delegation) => (
                <div key={delegation.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{delegation.delegatedTo}</h3>
                        {getDelegationStatusBadge(delegation.status)}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {delegation.role}
                      </div>
                      <div className="text-sm mb-2">
                        <strong>Permissions:</strong> {delegation.permissions.join(", ")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {delegation.startDate} → {delegation.endDate}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Reason: {delegation.reason}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {delegation.status === "active" && (
                        <Button size="sm" variant="outline">
                          Revoke
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 