"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Eye, 
  Search, 
  Loader2, 
  Edit, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  Circle,
  XCircle,
  Clock,
  FileText
} from "lucide-react";
import Link from "next/link";
import type { Application } from "@/types/database";

interface ApplicationsListProps {
  applications: Application[];
  loading?: boolean;
}

export function ApplicationsList({ applications, loading = false }: ApplicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
        app.project_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.application_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.province?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === "all" || app.application_type === typeFilter;
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [applications, searchQuery, typeFilter, statusFilter]);

  // Function to get the appropriate status with icon and color
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "draft":
        return {
          label: "Draft",
          icon: <Circle className="h-4 w-4" />,
          className: "bg-gray-100 text-gray-700 border-0 hover:bg-gray-100 px-3 py-2 rounded-full font-medium"
        };
      case "submitted":
        return {
          label: "Submitted",
          icon: <Clock className="h-4 w-4" />,
          className: "bg-blue-100 text-blue-700 border-0 hover:bg-blue-100 px-3 py-2 rounded-full font-medium"
        };
      case "under_review":
        return {
          label: "Under Review",
          icon: <AlertCircle className="h-4 w-4" />,
          className: "bg-amber-100 text-amber-700 border-0 hover:bg-amber-100 px-3 py-2 rounded-full font-medium"
        };
      case "pending_inspection":
        return {
          label: "Pending Inspection",
          icon: <Eye className="h-4 w-4" />,
          className: "bg-purple-100 text-purple-700 border-0 hover:bg-purple-100 px-3 py-2 rounded-full font-medium"
        };
      case "approved":
        return {
          label: "Approved",
          icon: <CheckCircle2 className="h-4 w-4" />,
          className: "bg-green-100 text-green-700 border-0 hover:bg-green-100 px-3 py-2 rounded-full font-medium"
        };
      case "rejected":
        return {
          label: "Rejected",
          icon: <XCircle className="h-4 w-4" />,
          className: "bg-red-100 text-red-700 border-0 hover:bg-red-100 px-3 py-2 rounded-full font-medium"
        };
      case "revision_required":
        return {
          label: "Revision Required",
          icon: <AlertCircle className="h-4 w-4" />,
          className: "bg-orange-100 text-orange-700 border-0 hover:bg-orange-100 px-3 py-2 rounded-full font-medium"
        };
      case "cancelled":
        return {
          label: "Cancelled",
          icon: <XCircle className="h-4 w-4" />,
          className: "bg-gray-100 text-gray-700 border-0 hover:bg-gray-100 px-3 py-2 rounded-full font-medium"
        };
      default:
        return {
          label: "Unknown",
          icon: <Circle className="h-4 w-4" />,
          className: "bg-gray-100 text-gray-700 border-0 hover:bg-gray-100 px-3 py-2 rounded-full font-medium"
        };
    }
  };

  const getStatusBadge = (status: string) => {
    const config = getStatusConfig(status);
    return (
      <div className={`inline-flex items-center gap-2 text-sm ${config.className}`}>
        {config.icon}
        {config.label}
      </div>
    );
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format application type for display
  const formatApplicationType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading applications...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Label className="text-sm whitespace-nowrap">Filter by:</Label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="domestic">Domestic</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="agricultural">Agricultural</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="municipal">Municipal</SelectItem>
              <SelectItem value="mining_water_use">Mining Water Use</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="pending_inspection">Pending Inspection</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="revision_required">Revision Required</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Applications Table */}
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-gray-50/50">
              <TableHead className="font-semibold text-gray-700 px-6 py-4">Date</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4">Application ID</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4">Project Title</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4">Type</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4">Location</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <TableRow key={application.id} className="hover:bg-blue-50/30 transition-colors duration-150 border-b border-gray-100">
                  <TableCell className="font-medium text-gray-900 px-6 py-4">
                    <div className="text-sm">
                      {formatDate(application.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 px-6 py-4">
                    <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-md font-medium">
                      {application.application_number || `RWB-${application.id.slice(-6)}`}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 px-6 py-4 max-w-xs">
                    <div className="truncate" title={application.project_title}>
                      {application.project_title}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 px-6 py-4">
                    <div className="text-sm">
                      {formatApplicationType(application.application_type)}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {getStatusBadge(application.status)}
                  </TableCell>
                  <TableCell className="text-gray-600 px-6 py-4">
                    <div className="text-sm">
                      {application.district}, {application.province}
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6 py-4">
                    <div className="flex justify-end gap-1.5">
                      {application.status === 'draft' && (
                        <Link href={`/dashboard/edit-application/${application.id}`}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                            title="Edit Application"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/dashboard/application/${application.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                          title="View Application"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16 text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">
                        {applications.length === 0 ? "No applications yet" : "No matches found"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {applications.length === 0 
                          ? "Create your first water permit application to get started."
                          : "Try adjusting your search or filter criteria."
                        }
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 