"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Download, AlertCircle } from "lucide-react";
import Link from "next/link";

export interface Permit {
  id: string;
  title: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "expiring-soon";
  type: string;
  location: string;
  permitNumber: string;
}

interface PermitsListProps {
  permits: Permit[];
}

export function PermitsList({ permits }: PermitsListProps) {
  const activePermits = permits.filter(permit => 
    permit.status === "active" || permit.status === "expiring-soon"
  );
  const expiredPermits = permits.filter(permit => permit.status === "expired");
  
  // Function to get the appropriate badge color based on permit status
  const getStatusBadge = (status: string, expiryDate: string) => {
    // Check if expiring within 30 days
    const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
    
    switch (status) {
      case "active":
        if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
          return (
            <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Expires Soon
            </Badge>
          );
        }
        return <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>;
      case "expiring-soon":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Expires Soon
          </Badge>
        );
      case "expired":
        return <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Expired</Badge>;
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
  
  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Format expiry time in a human-friendly way
  const formatExpiryTime = (expiryDate: string) => {
    const days = getDaysUntilExpiry(expiryDate);
    
    if (days < 0) {
      return `Expired ${Math.abs(days)} days ago`;
    } else if (days === 0) {
      return "Expires today";
    } else if (days === 1) {
      return "Expires tomorrow";
    } else if (days <= 30) {
      return `Expires in ${days} days`;
    } else {
      return `Expires on ${formatDate(expiryDate)}`;
    }
  };

  const renderPermitsTable = (permitsList: Permit[]) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permit Number</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permitsList.length > 0 ? (
            permitsList.map((permit) => (
              <TableRow key={permit.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="font-medium">{permit.permitNumber}</TableCell>
                <TableCell>{permit.title}</TableCell>
                <TableCell>{permit.type}</TableCell>
                <TableCell>{formatDate(permit.issueDate)}</TableCell>
                <TableCell>
                  <span className={`text-sm ${
                    permit.status === "expired" 
                      ? "text-red-600" 
                      : getDaysUntilExpiry(permit.expiryDate) <= 30 
                        ? "text-amber-600" 
                        : "text-green-600"
                  }`}>
                    {formatExpiryTime(permit.expiryDate)}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(permit.status, permit.expiryDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Link href={`/dashboard/permit/${permit.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No permits found in this category.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <CardTitle>Your Permits</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="active" className="w-full">
            <div className="px-6">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="active">Active Permits ({activePermits.length})</TabsTrigger>
                <TabsTrigger value="expired">Expired Permits ({expiredPermits.length})</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="active" className="mt-0">
              {renderPermitsTable(activePermits)}
            </TabsContent>
            
            <TabsContent value="expired" className="mt-0">
              {renderPermitsTable(expiredPermits)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
} 