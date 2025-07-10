"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Activity
} from "lucide-react";

export function AdminReports() {
  const [timeRange, setTimeRange] = useState("30d");
  const [reportType, setReportType] = useState("overview");

  // Mock report data
  const reportData = {
    overview: {
      totalApplications: 1247,
      approvedApplications: 1156,
      rejectedApplications: 68,
      pendingApplications: 23,
      totalValue: 125600000, // RWF
      avgProcessingTime: 12.3,
      userSatisfaction: 4.6,
      systemUptime: 99.8
    },
    trends: {
      monthlyApplications: [78, 89, 95, 102, 89, 94],
      monthlyApprovals: [72, 83, 88, 95, 85, 89],
      processingTimes: [14.2, 13.8, 13.1, 12.9, 12.5, 12.3],
      months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    },
    byType: {
      domestic: { count: 432, percentage: 34.6, value: 21500000 },
      commercial: { count: 298, percentage: 23.9, value: 45200000 },
      industrial: { count: 245, percentage: 19.6, value: 38900000 },
      agricultural: { count: 156, percentage: 12.5, value: 12800000 },
      municipal: { count: 89, percentage: 7.1, value: 6200000 },
      mining: { count: 27, percentage: 2.2, value: 1000000 }
    },
    byLocation: {
      kigali: { count: 523, percentage: 42.0 },
      northern: { count: 198, percentage: 15.9 },
      southern: { count: 167, percentage: 13.4 },
      eastern: { count: 189, percentage: 15.2 },
      western: { count: 170, percentage: 13.6 }
    },
    performance: {
      avgReviewTime: 8.5,
      avgInspectionTime: 3.8,
      overtimeApplications: 23,
      staffUtilization: 78,
      errorRate: 0.02
    }
  };

  const generateReport = (type: string) => {
    // Mock function to generate and download reports
    alert(`Generating ${type} report for ${timeRange}...`);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Reports & Analytics</CardTitle>
              <CardDescription>
                Comprehensive insights and performance metrics
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => generateReport("comprehensive")}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.overview.totalApplications}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+8.2%</span>
                  <span>from last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((reportData.overview.approvedApplications / reportData.overview.totalApplications) * 100)}%
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+2.1%</span>
                  <span>improvement</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(reportData.overview.totalValue / 1000000).toFixed(0)}M RWF
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+15.3%</span>
                  <span>growth</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.overview.avgProcessingTime} days</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">-1.2 days</span>
                  <span>faster</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Type Breakdown */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Applications by Type</CardTitle>
                <CardDescription>Distribution of permit applications by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(reportData.byType).map(([type, data]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{type.replace('_', ' ')}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{data.count}</span>
                        <span className="text-muted-foreground">({data.percentage}%)</span>
                      </div>
                    </div>
                    <Progress value={data.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Value: {(data.value / 1000000).toFixed(1)}M RWF
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Applications by province</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(reportData.byLocation).map(([location, data]) => (
                  <div key={location} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{location} Province</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{data.count}</span>
                        <span className="text-muted-foreground">({data.percentage}%)</span>
                      </div>
                    </div>
                    <Progress value={data.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Review Time</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.performance.avgReviewTime} days</div>
                <p className="text-xs text-muted-foreground">Average review time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inspection Time</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.performance.avgInspectionTime} days</div>
                <p className="text-xs text-muted-foreground">Average inspection time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Staff Utilization</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.performance.staffUtilization}%</div>
                <p className="text-xs text-muted-foreground">Current utilization</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.performance.errorRate}%</div>
                <p className="text-xs text-muted-foreground">System error rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Monthly performance metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Monthly Application Trends</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {reportData.trends.months.map((month, index) => (
                      <div key={month} className="text-center space-y-1">
                        <div className="text-xs text-muted-foreground">{month}</div>
                        <div className="h-20 bg-gray-100 rounded relative">
                          <div 
                            className="bg-blue-500 rounded absolute bottom-0 w-full transition-all"
                            style={{ 
                              height: `${(reportData.trends.monthlyApplications[index] / Math.max(...reportData.trends.monthlyApplications)) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium">{reportData.trends.monthlyApplications[index]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Processing Time Improvement</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {reportData.trends.months.map((month, index) => (
                      <div key={month} className="text-center space-y-1">
                        <div className="text-xs text-muted-foreground">{month}</div>
                        <div className="h-20 bg-gray-100 rounded relative">
                          <div 
                            className="bg-green-500 rounded absolute bottom-0 w-full transition-all"
                            style={{ 
                              height: `${(reportData.trends.processingTimes[index] / Math.max(...reportData.trends.processingTimes)) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium">{reportData.trends.processingTimes[index]}d</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Advanced Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User activity and satisfaction metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction</span>
                    <span className="font-medium">{reportData.overview.userSatisfaction}/5.0</span>
                  </div>
                  <Progress value={(reportData.overview.userSatisfaction / 5) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>System Uptime</span>
                    <span className="font-medium">{reportData.overview.systemUptime}%</span>
                  </div>
                  <Progress value={reportData.overview.systemUptime} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mobile Usage</span>
                    <span className="font-medium">34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Technical performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">99.8%</div>
                    <div className="text-sm text-green-600 dark:text-green-500">Uptime</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">145ms</div>
                    <div className="text-sm text-blue-600 dark:text-blue-500">Response Time</div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">0.02%</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-500">Error Rate</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">78%</div>
                    <div className="text-sm text-purple-600 dark:text-purple-500">CPU Usage</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>Compliance with water permit regulations and SLAs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">SLA Compliance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Review SLA (14 days)</span>
                      <Badge variant="default">92% Compliant</Badge>
                    </div>
                    <Progress value={92} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Inspection SLA (7 days)</span>
                      <Badge variant="default">88% Compliant</Badge>
                    </div>
                    <Progress value={88} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Processing (21 days)</span>
                      <Badge variant="default">95% Compliant</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Regulatory Requirements</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Environmental Assessments</span>
                      <Badge variant="default">100% Complete</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Documentation Standards</span>
                      <Badge variant="default">98% Compliant</Badge>
                    </div>
                    <Progress value={98} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Audit Trail</span>
                      <Badge variant="default">100% Complete</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>Generate common reports instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" onClick={() => generateReport("monthly")}>
              <FileText className="h-4 w-4 mr-2" />
              Monthly Summary
            </Button>
            <Button variant="outline" onClick={() => generateReport("performance")}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Report
            </Button>
            <Button variant="outline" onClick={() => generateReport("compliance")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Compliance Report
            </Button>
            <Button variant="outline" onClick={() => generateReport("financial")}>
              <DollarSign className="h-4 w-4 mr-2" />
              Financial Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 