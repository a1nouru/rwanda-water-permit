"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ApplicationsList } from "@/components/dashboard/applications-list";
import { ApplicationStatus } from "@/components/dashboard/application-status";
import { PermitsList, Permit } from "@/components/dashboard/permits-list";
import { PermitStatus } from "@/components/dashboard/permits-status";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "permits">("applications");
  
  // Mock data - in a real application, this would come from an API
  const applications = [
    {
      id: "APP-001",
      title: "Water Permit Application",
      date: "2023-10-12",
      status: "pending",
      type: "Commercial",
      location: "Kigali, Gasabo",
    },
    {
      id: "APP-002",
      title: "Water Permit Renewal",
      date: "2023-09-05",
      status: "approved",
      type: "Industrial",
      location: "Musanze, Northern Province",
    },
    {
      id: "APP-003",
      title: "Water Extraction Permit",
      date: "2023-11-20",
      status: "rejected",
      type: "Agricultural",
      location: "Nyagatare, Eastern Province",
    },
  ];

  // Mock data for permits
  const permits: Permit[] = [
    {
      id: "PER-001",
      title: "Commercial Water Extraction",
      issueDate: "2023-05-15",
      expiryDate: "2025-05-15", // Valid for 2 years
      status: "active",
      type: "Commercial",
      location: "Kigali, Gasabo",
      permitNumber: "WP-2023-05-001",
    },
    {
      id: "PER-002",
      title: "Industrial Water Usage",
      issueDate: "2022-11-10",
      expiryDate: "2023-11-10", // Valid for 1 year - expired
      status: "expired",
      type: "Industrial",
      location: "Musanze, Northern Province",
      permitNumber: "WP-2022-11-002",
    },
    {
      id: "PER-003",
      title: "Agricultural Irrigation",
      issueDate: "2023-08-25",
      expiryDate: "2024-02-25", // Expires in less than 30 days
      status: "expiring-soon",
      type: "Agricultural",
      location: "Nyagatare, Eastern Province",
      permitNumber: "WP-2023-08-003",
    },
    {
      id: "PER-004",
      title: "Residential Water Supply",
      issueDate: "2023-03-05",
      expiryDate: "2024-03-05", // Expiring in about 3 months
      status: "active",
      type: "Residential",
      location: "Rubavu, Western Province",
      permitNumber: "WP-2023-03-004",
    },
    {
      id: "PER-005",
      title: "Mining Operation Water Usage",
      issueDate: "2021-10-15",
      expiryDate: "2023-10-15", // Recently expired
      status: "expired",
      type: "Industrial",
      location: "Rulindo, Northern Province",
      permitNumber: "WP-2021-10-005",
    },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="space-y-6">
          <Tabs defaultValue="applications" onValueChange={(value) => setActiveTab(value as "applications" | "permits")}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="permits">Permits</TabsTrigger>
              </TabsList>
              
              {activeTab === "applications" ? (
                <Link href="/dashboard/new-application">
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    New Application
                  </Button>
                </Link>
              ) : (
                <Button disabled className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  Manage Permits
                </Button>
              )}
            </div>
            
            <TabsContent value="applications" className="space-y-6 mt-0">
              <ApplicationStatus applications={applications} />
              <ApplicationsList applications={applications} />
            </TabsContent>
            
            <TabsContent value="permits" className="space-y-6 mt-0">
              <PermitStatus permits={permits} />
              <PermitsList permits={permits} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </DashboardLayout>
  );
} 