"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
import { Eye, Search } from "lucide-react";
import Link from "next/link";

interface Application {
  id: string;
  title: string;
  date: string;
  status: string;
  type: string;
  location: string;
}

interface ApplicationsListProps {
  applications: Application[];
}

export function ApplicationsList({ applications }: ApplicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === "all" || app.type.toLowerCase() === typeFilter.toLowerCase();
      const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [applications, searchQuery, typeFilter, statusFilter]);

  // Function to get the appropriate badge color based on application status
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

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-4">
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
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">ID</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Title</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Type</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Date</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Location</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
                            <TableBody className="bg-white">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                  <TableRow 
                    key={application.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                      <TableCell className="font-medium text-gray-900 py-4 px-6">{application.id}</TableCell>
                      <TableCell className="text-gray-700 py-4 px-6">{application.title}</TableCell>
                      <TableCell className="text-gray-700 py-4 px-6">{application.type}</TableCell>
                      <TableCell className="text-gray-700 py-4 px-6">{formatDate(application.date)}</TableCell>
                      <TableCell className="text-gray-700 py-4 px-6">{application.location}</TableCell>
                      <TableCell className="py-4 px-6">{getStatusBadge(application.status)}</TableCell>
                      <TableCell className="text-center py-4 px-6">
                        <Link href={`/dashboard/application/${application.id}`}>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    {applications.length === 0 
                      ? "No applications found. Create a new application to get started."
                      : "No applications match your current filters. Try adjusting your search or filters."
                    }
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 