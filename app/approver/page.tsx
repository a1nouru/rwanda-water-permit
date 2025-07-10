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
  Award,
  Scale
} from "lucide-react";
import { FinalDecisions } from "@/components/approver/final-decisions";
import { ExecutiveOverview } from "@/components/approver/executive-overview";
import { GovernanceManagement } from "@/components/approver/governance-management";
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-center">
              Rwanda Water Board
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Chief Executive Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div className="text-right">
              <p className="text-sm font-medium">Executive Authority</p>
              <p className="text-xs text-muted-foreground">Final Approval</p>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockStats.pendingFinalApproval}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting your decision
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.approvedThisMonth}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockStats.rejectedThisMonth}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Decision</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.avgDecisionTime}</div>
              <p className="text-xs text-muted-foreground">
                Days processing
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                System wide
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.complianceRate}%</div>
              <p className="text-xs text-muted-foreground">
                System compliance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="decisions">Final Decisions</TabsTrigger>
            <TabsTrigger value="overview">Executive Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
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
          
          <TabsContent value="governance" className="space-y-6">
            <GovernanceManagement />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 