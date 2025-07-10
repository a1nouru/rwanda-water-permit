"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users, 
  Calendar,
  Target,
  Award,
  AlertCircle,
  BarChart3,
  Download
} from "lucide-react";

interface PerformanceKPI {
  name: string;
  current: number;
  target: number;
  previous: number;
  unit: string;
  trend: "up" | "down" | "stable";
  status: "excellent" | "good" | "warning" | "critical";
}

interface StaffPerformance {
  name: string;
  role: "reviewer" | "inspector";
  applicationsProcessed: number;
  averageProcessingTime: number;
  qualityScore: number;
  efficiency: number;
}

const mockKPIs: PerformanceKPI[] = [
  {
    name: "Average Processing Time",
    current: 9.5,
    target: 10.0,
    previous: 11.2,
    unit: "days",
    trend: "up",
    status: "excellent"
  },
  {
    name: "Application Approval Rate",
    current: 87.3,
    target: 85.0,
    previous: 84.8,
    unit: "%",
    trend: "up",
    status: "excellent"
  },
  {
    name: "SLA Compliance",
    current: 94.2,
    target: 95.0,
    previous: 92.1,
    unit: "%",
    trend: "up",
    status: "good"
  },
  {
    name: "First Review Pass Rate",
    current: 78.5,
    target: 80.0,
    previous: 76.2,
    unit: "%",
    trend: "up",
    status: "good"
  },
  {
    name: "Customer Satisfaction",
    current: 4.3,
    target: 4.5,
    previous: 4.1,
    unit: "/5",
    trend: "up",
    status: "good"
  },
  {
    name: "System Uptime",
    current: 99.8,
    target: 99.9,
    previous: 99.6,
    unit: "%",
    trend: "up",
    status: "excellent"
  }
];

const mockStaffPerformance: StaffPerformance[] = [
  {
    name: "Sarah Johnson",
    role: "reviewer",
    applicationsProcessed: 47,
    averageProcessingTime: 5.2,
    qualityScore: 96.5,
    efficiency: 94.2
  },
  {
    name: "Michael Brown",
    role: "reviewer",
    applicationsProcessed: 52,
    averageProcessingTime: 4.8,
    qualityScore: 94.8,
    efficiency: 97.1
  },
  {
    name: "Alice Wilson",
    role: "inspector",
    applicationsProcessed: 31,
    averageProcessingTime: 6.1,
    qualityScore: 98.2,
    efficiency: 92.7
  },
  {
    name: "Robert Davis",
    role: "inspector",
    applicationsProcessed: 28,
    averageProcessingTime: 6.8,
    qualityScore: 95.1,
    efficiency: 89.3
  },
  {
    name: "Emma Thompson",
    role: "reviewer",
    applicationsProcessed: 39,
    averageProcessingTime: 5.9,
    qualityScore: 92.4,
    efficiency: 87.8
  }
];

const monthlyData = [
  { month: "Oct", applications: 145, processed: 138, avgTime: 12.3, satisfaction: 4.1 },
  { month: "Nov", applications: 162, processed: 156, avgTime: 11.8, satisfaction: 4.2 },
  { month: "Dec", applications: 134, processed: 129, avgTime: 11.2, satisfaction: 4.1 },
  { month: "Jan", applications: 189, processed: 184, avgTime: 10.7, satisfaction: 4.3 },
  { month: "Feb", applications: 203, processed: 197, avgTime: 10.1, satisfaction: 4.3 },
  { month: "Mar", applications: 234, processed: 228, avgTime: 9.5, satisfaction: 4.3 }
];

export function PerformanceMetrics() {
  const getKPIStatus = (kpi: PerformanceKPI) => {
    const colors = {
      excellent: "text-green-600 bg-green-50 border-green-200",
      good: "text-blue-600 bg-blue-50 border-blue-200",
      warning: "text-orange-600 bg-orange-50 border-orange-200",
      critical: "text-red-600 bg-red-50 border-red-200"
    };
    return colors[kpi.status];
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  const getRoleIcon = (role: "reviewer" | "inspector") => {
    return role === "reviewer" ? <CheckCircle className="h-4 w-4" /> : <Target className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Performance Metrics
          </h2>
          <p className="text-muted-foreground">
            Detailed analytics and key performance indicators
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <BarChart3 className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Analytics</span>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockKPIs.map((kpi) => (
          <Card key={kpi.name} className={`border-2 ${getKPIStatus(kpi)}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              {getTrendIcon(kpi.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.current}{kpi.unit}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-muted-foreground">
                  Target: {kpi.target}{kpi.unit}
                </div>
                <div className="text-xs">
                  {kpi.current > kpi.previous ? (
                    <span className="text-green-600">
                      +{((kpi.current - kpi.previous) / kpi.previous * 100).toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-red-600">
                      {((kpi.current - kpi.previous) / kpi.previous * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <Progress 
                value={(kpi.current / kpi.target) * 100} 
                className="mt-2 h-2" 
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Trends</CardTitle>
          <CardDescription>
            Application processing and satisfaction trends over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground border-b pb-2">
              <div>Month</div>
              <div>Applications</div>
              <div>Avg Processing Time</div>
              <div>Satisfaction</div>
            </div>
            {monthlyData.map((data, index) => (
              <div key={data.month} className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium">{data.month} 2024</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">
                    {data.processed}/{data.applications}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {((data.processed / data.applications) * 100).toFixed(0)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">{data.avgTime} days</div>
                  {index > 0 && data.avgTime < monthlyData[index - 1].avgTime && (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">{data.satisfaction}/5</div>
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(data.satisfaction))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance</CardTitle>
          <CardDescription>
            Individual performance metrics for reviewers and inspectors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStaffPerformance.map((staff) => (
              <div key={staff.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(staff.role)}
                    <div>
                      <div className="font-medium">{staff.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {staff.role}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">{staff.applicationsProcessed}</div>
                    <div className="text-xs text-muted-foreground">Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{staff.averageProcessingTime}d</div>
                    <div className="text-xs text-muted-foreground">Avg Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{staff.qualityScore}%</div>
                    <div className="text-xs text-muted-foreground">Quality</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20">
                      <Progress value={staff.efficiency} className="h-2" />
                    </div>
                    <div className="text-sm font-medium">{staff.efficiency}%</div>
                  </div>
                  <Badge 
                    variant={staff.efficiency >= 95 ? "default" : staff.efficiency >= 90 ? "secondary" : "outline"}
                    className={
                      staff.efficiency >= 95 ? "bg-green-100 text-green-800" :
                      staff.efficiency >= 90 ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {staff.efficiency >= 95 ? "Excellent" : staff.efficiency >= 90 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Highlights</CardTitle>
            <CardDescription>
              Top achievements this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Award className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Processing Time Record</div>
                  <div className="text-sm text-muted-foreground">
                    Achieved fastest average processing time: 9.5 days
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Volume Increase Handled</div>
                  <div className="text-sm text-muted-foreground">
                    15% more applications processed efficiently
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-medium">Quality Maintained</div>
                  <div className="text-sm text-muted-foreground">
                    Quality score remained above 92% despite increased volume
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
            <CardDescription>
              Focus areas for next quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-medium">SLA Compliance Gap</div>
                  <div className="text-sm text-muted-foreground">
                    Need 0.8% improvement to reach 95% target
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Staff Training</div>
                  <div className="text-sm text-muted-foreground">
                    Focus on advanced assessment techniques
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-medium">First Pass Rate</div>
                  <div className="text-sm text-muted-foreground">
                    Target 80% to reduce revision cycles
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 