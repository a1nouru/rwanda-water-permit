"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Server,
  Activity
} from "lucide-react";

export function SystemOverview() {
  // Mock system data
  const systemMetrics = {
    applications: {
      total: 1247,
      thisMonth: 89,
      change: +12.5,
      pending: 23,
      approved: 1156,
      rejected: 68
    },
    users: {
      total: 342,
      active: 287,
      newThisMonth: 12,
      change: +3.5
    },
    performance: {
      avgProcessingTime: 12.3,
      uptime: 99.8,
      responseTime: 145,
      errorRate: 0.02
    },
    workload: {
      reviewersAvg: 8.5,
      inspectorsAvg: 12.7,
      overdueApplications: 5
    }
  };

  const recentActivity = [
    {
      id: 1,
      action: "New application submitted",
      details: "RWB-24-00156 by John Smith",
      timestamp: "2 minutes ago",
      type: "application"
    },
    {
      id: 2,
      action: "Inspection completed",
      details: "INS-24-045 - Surface water permit",
      timestamp: "15 minutes ago",
      type: "inspection"
    },
    {
      id: 3,
      action: "Application approved",
      details: "RWB-24-00154 - Industrial water use",
      timestamp: "32 minutes ago",
      type: "approval"
    },
    {
      id: 4,
      action: "New user registered",
      details: "Alice Johnson (Applicant)",
      timestamp: "1 hour ago",
      type: "user"
    },
    {
      id: 5,
      action: "System maintenance completed",
      details: "Database optimization routine",
      timestamp: "3 hours ago",
      type: "system"
    }
  ];

  const statusDistribution = [
    { status: "Submitted", count: 23, color: "bg-blue-500" },
    { status: "Under Review", count: 18, color: "bg-yellow-500" },
    { status: "Pending Inspection", count: 15, color: "bg-orange-500" },
    { status: "Approved", count: 89, color: "bg-green-500" },
    { status: "Rejected", count: 5, color: "bg-red-500" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "application":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "inspection":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "user":
        return <Users className="h-4 w-4 text-purple-600" />;
      case "system":
        return <Server className="h-4 w-4 text-gray-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.applications.thisMonth}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{systemMetrics.applications.change}%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.users.active}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{systemMetrics.users.change}%</span>
              <span>growth rate</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.performance.avgProcessingTime} days</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-2.1 days</span>
              <span>improvement</span>
            </div>
          </CardContent>
        </Card>
        

      </div>

            {/* Application Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status Distribution</CardTitle>
          <CardDescription>
            Current breakdown of all applications by status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {statusDistribution.map((item, index) => {
            const total = statusDistribution.reduce((sum, s) => sum + s.count, 0);
            const percentage = Math.round((item.count / total) * 100);
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${item.color}`} />
                    <span>{item.status}</span>
                  </div>
                  <div className="font-medium">
                    {item.count} ({percentage}%)
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system events and user actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workload Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Team Workload</CardTitle>
            <CardDescription>
              Current workload distribution across teams
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Reviewers</span>
                <span className="text-sm text-muted-foreground">
                  Avg: {systemMetrics.workload.reviewersAvg} applications
                </span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Moderate workload - within acceptable range
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Inspectors</span>
                <span className="text-sm text-muted-foreground">
                  Avg: {systemMetrics.workload.inspectorsAvg} inspections
                </span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground">
                High workload - consider resource allocation
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Attention Required
                </span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                {systemMetrics.workload.overdueApplications} applications are overdue and require immediate attention
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 