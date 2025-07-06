"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  FileCheck, 
  Calendar,
  MapPin,
  User,
  Send,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react"
import Link from "next/link"

// Sample inspections data
const inspections = [
  {
    id: "INS-24-001",
    applicationId: "RWB-24-00123",
    applicant: "John Doe",
    location: "Kigali, Gasabo District",
    type: "Surface Water",
    status: "Draft",
    priority: "High",
    inspectionDate: "2024-03-20",
    completedDate: null,
    inspector: "Alice Johnson",
    compliance: null,
    findings: "Initial assessment in progress",
    progress: 65
  },
  {
    id: "INS-24-002",
    applicationId: "RWB-24-00120",
    applicant: "Jane Smith",
    location: "Musanze, Kinigi Sector",
    type: "Groundwater",
    status: "Completed",
    priority: "Medium",
    inspectionDate: "2024-03-18",
    completedDate: "2024-03-19",
    inspector: "Bob Wilson",
    compliance: "Compliant",
    findings: "All requirements met. No issues found.",
    progress: 100
  },
  {
    id: "INS-24-003",
    applicationId: "RWB-24-00125",
    applicant: "Robert Johnson",
    location: "Kigali, Nyarugenge District",
    type: "Surface Water",
    status: "In Review",
    priority: "Low",
    inspectionDate: "2024-03-21",
    completedDate: "2024-03-22",
    inspector: "Carol Davis",
    compliance: "Minor Issues",
    findings: "Minor documentation issues. Follow-up required.",
    progress: 100
  },
  {
    id: "INS-24-004",
    applicationId: "RWB-24-00126",
    applicant: "Maria Rodriguez",
    location: "Huye, Ngoma Sector",
    type: "Groundwater",
    status: "Submitted",
    priority: "High",
    inspectionDate: "2024-03-17",
    completedDate: "2024-03-17",
    inspector: "Dave Brown",
    compliance: "Non-Compliant",
    findings: "Significant violations found. Immediate action required.",
    progress: 100
  },
  {
    id: "INS-24-005",
    applicationId: "RWB-24-00127",
    applicant: "Peter Kim",
    location: "Rwamagana, Kigabiro Sector",
    type: "Surface Water",
    status: "Draft",
    priority: "Medium",
    inspectionDate: "2024-03-22",
    completedDate: null,
    inspector: "Alice Johnson",
    compliance: null,
    findings: "Environmental assessment pending",
    progress: 30
  }
]

export function InspectionsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [complianceFilter, setComplianceFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inspection.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCompliance = complianceFilter === "all" || 
                             (inspection.compliance && inspection.compliance.toLowerCase() === complianceFilter.toLowerCase())
    const matchesPriority = priorityFilter === "all" || inspection.priority.toLowerCase() === priorityFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesCompliance && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft": return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      case "completed": return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "in review": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "submitted": return "bg-green-100 text-green-800 hover:bg-green-100"
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft": return <Edit className="h-3 w-3" />
      case "completed": return <CheckCircle2 className="h-3 w-3" />
      case "in review": return <Clock className="h-3 w-3" />
      case "submitted": return <Send className="h-3 w-3" />
      default: return <FileCheck className="h-3 w-3" />
    }
  }

  const getComplianceColor = (compliance: string | null) => {
    if (!compliance) return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    switch (compliance.toLowerCase()) {
      case "compliant": return "bg-green-100 text-green-800 hover:bg-green-100"
      case "minor issues": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "non-compliant": return "bg-red-100 text-red-800 hover:bg-red-100"
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getComplianceIcon = (compliance: string | null) => {
    if (!compliance) return null
    switch (compliance.toLowerCase()) {
      case "compliant": return <CheckCircle2 className="h-3 w-3" />
      case "minor issues": return <AlertTriangle className="h-3 w-3" />
      case "non-compliant": return <XCircle className="h-3 w-3" />
      default: return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800 hover:bg-red-100"
      case "medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "low": return "bg-green-100 text-green-800 hover:bg-green-100"
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Inspections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by applicant, inspection ID, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in review">In Review</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={complianceFilter} onValueChange={setComplianceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Compliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Compliance</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="minor issues">Minor Issues</SelectItem>
                <SelectItem value="non-compliant">Non-Compliant</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inspections Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            My Inspections ({filteredInspections.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inspection</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInspections.map((inspection) => (
                  <TableRow key={inspection.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">{inspection.id}</div>
                      <div className="text-sm text-muted-foreground">
                        App: {inspection.applicationId}
                      </div>
                      {inspection.status === "Draft" && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Progress: {inspection.progress}%
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{inspection.applicant}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {inspection.inspector}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{inspection.location}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{inspection.type}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(inspection.status)}>
                        {getStatusIcon(inspection.status)}
                        {inspection.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {inspection.compliance ? (
                        <Badge className={getComplianceColor(inspection.compliance)}>
                          {getComplianceIcon(inspection.compliance)}
                          {inspection.compliance}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(inspection.priority)}>
                        {inspection.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{inspection.inspectionDate}</span>
                      </div>
                      {inspection.completedDate && (
                        <div className="text-xs text-muted-foreground">
                          Completed: {inspection.completedDate}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/inspection/${inspection.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        {inspection.status === "Draft" && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/inspection/new?inspectionId=${inspection.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Continue
                            </Link>
                          </Button>
                        )}
                        {inspection.status === "Completed" && (
                          <Button size="sm" variant="default">
                            <Send className="h-4 w-4 mr-2" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 