"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Search, 
  Filter, 
  Eye, 
  FileCheck, 
  MapPin, 
  Calendar,
  Droplets,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

// Sample applications data
const applications = [
  {
    id: "RWB-24-00123",
    applicant: "John Doe",
    company: "AquaTech Solutions",
    location: "Kigali, Gasabo District",
    type: "Surface Water",
    purpose: "Industrial Use",
    status: "Pending Inspection",
    priority: "High",
    submittedDate: "2024-03-15",
    dueDate: "2024-03-30",
    estimatedVolume: "500 m³/day",
    contactPhone: "+250 788 123 456",
    contactEmail: "john.doe@aquatech.rw",
    notes: "Large-scale industrial water extraction for manufacturing facility. Requires environmental impact assessment.",
    coordinates: "-1.9441, 30.0619"
  },
  {
    id: "RWB-24-00124",
    applicant: "Jane Smith",
    company: "Green Valley Farm",
    location: "Musanze, Kinigi Sector",
    type: "Groundwater",
    purpose: "Agricultural Use",
    status: "Pending Inspection",
    priority: "Medium",
    submittedDate: "2024-03-16",
    dueDate: "2024-04-01",
    estimatedVolume: "200 m³/day",
    contactPhone: "+250 788 234 567",
    contactEmail: "jane.smith@greenvalley.rw",
    notes: "Irrigation system for potato farming. Well drilling location needs verification.",
    coordinates: "-1.4992, 29.6349"
  },
  {
    id: "RWB-24-00125",
    applicant: "Robert Johnson",
    company: "City Hotels Ltd",
    location: "Kigali, Nyarugenge District",
    type: "Surface Water",
    purpose: "Commercial Use",
    status: "Pending Inspection",
    priority: "Low",
    submittedDate: "2024-03-18",
    dueDate: "2024-04-05",
    estimatedVolume: "150 m³/day",
    contactPhone: "+250 788 345 678",
    contactEmail: "robert.johnson@cityhotels.rw",
    notes: "Hotel complex water supply system. Standard commercial inspection required.",
    coordinates: "-1.9536, 30.0606"
  }
]

export function ApplicationsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null)

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || app.priority.toLowerCase() === priorityFilter
    const matchesType = typeFilter === "all" || app.type.toLowerCase() === typeFilter.toLowerCase()
    
    return matchesSearch && matchesPriority && matchesType
  })

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800 hover:bg-red-100"
      case "medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "low": return "bg-green-100 text-green-800 hover:bg-green-100"
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return <AlertCircle className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by applicant, company, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Water Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="surface water">Surface Water</SelectItem>
                <SelectItem value="groundwater">Groundwater</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Applications Pending Inspection ({filteredApplications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">{application.id}</div>
                      <div className="text-sm text-muted-foreground">{application.company}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{application.applicant}</div>
                      <div className="text-sm text-muted-foreground">{application.purpose}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{application.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        {application.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(application.priority)}>
                        {getPriorityIcon(application.priority)}
                        {application.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{application.dueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApp(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                            </DialogHeader>
                            {selectedApp && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Application ID</p>
                                    <p className="font-medium">{selectedApp.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Priority</p>
                                    <Badge className={getPriorityColor(selectedApp.priority)}>
                                      {selectedApp.priority}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Applicant</p>
                                    <p className="font-medium">{selectedApp.applicant}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                                    <p className="font-medium">{selectedApp.company}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Water Type</p>
                                    <p className="font-medium">{selectedApp.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Purpose</p>
                                    <p className="font-medium">{selectedApp.purpose}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Estimated Volume</p>
                                    <p className="font-medium">{selectedApp.estimatedVolume}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                                    <p className="font-medium">{selectedApp.dueDate}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                                  <p className="font-medium">{selectedApp.location}</p>
                                  <p className="text-sm text-muted-foreground">Coordinates: {selectedApp.coordinates}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
                                  <p className="font-medium">{selectedApp.contactPhone}</p>
                                  <p className="text-sm text-muted-foreground">{selectedApp.contactEmail}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Notes</p>
                                  <p className="text-sm">{selectedApp.notes}</p>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                  <Button variant="outline" onClick={() => setSelectedApp(null)}>
                                    Close
                                  </Button>
                                  <Button asChild>
                                    <Link href={`/inspection/new?applicationId=${selectedApp.id}`}>
                                      <FileCheck className="h-4 w-4 mr-2" />
                                      Begin Inspection
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" asChild>
                          <Link href={`/inspection/new?applicationId=${application.id}`}>
                            <FileCheck className="h-4 w-4 mr-2" />
                            Inspect
                          </Link>
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
    </div>
  )
} 