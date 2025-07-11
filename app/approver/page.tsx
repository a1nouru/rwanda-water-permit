"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  FileCheck, 
  AlertTriangle,
  Shield,
  Scale
} from "lucide-react";
import { FinalDecisions } from "@/components/approver/final-decisions";
import { ExecutiveOverview } from "@/components/approver/executive-overview";
import { PerformanceMetrics } from "@/components/approver/performance-metrics";

interface DashboardStats {
  pendingFinalApproval: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
  totalApplications: number;
  avgDecisionTime: number;
  complianceRate: number;
}

const mockStats: DashboardStats = {
  pendingFinalApproval: 8,
  approvedThisMonth: 47,
  rejectedThisMonth: 3,
  totalApplications: 567,
  avgDecisionTime: 2.3,
  complianceRate: 98.2
};

export default function ApproverDashboard() {
  const [activeTab, setActiveTab] = useState("decisions");

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
          <div>
            <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              Executive Approver Dashboard
            </h1>
            <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground">
              Strategic oversight and final decision-making for water permit applications
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingFinalApproval}</div>
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
                Awaiting your review
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.approvedThisMonth}</div>
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.rejectedThisMonth}</div>
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
                Past 7 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Decision</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.avgDecisionTime}</div>
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
                Average processing
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalApplications}</div>
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-xs text-muted-foreground">
                Success rate
              </p>
            </CardContent>
          </Card>
          

        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 pt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="decisions" className="flex items-center space-x-2">
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">Final Decisions</span>
              <span className="sm:hidden">Decisions</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Executive Overview</span>
              <span className="sm:hidden">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Performance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="decisions" className="space-y-6">
            <FinalDecisions />
          </TabsContent>
          
          <TabsContent value="overview" className="space-y-6">
            <ExecutiveOverview />
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <PerformanceMetrics />
          </TabsContent>
          

        </Tabs>
      </motion.div>
    </div>
  );
} 