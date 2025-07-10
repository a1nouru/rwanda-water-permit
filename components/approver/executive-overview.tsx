"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Users, 
  Droplet, 
  Factory, 
  Tractor,
  Building,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Globe
} from "lucide-react";

interface RegionalData {
  province: string;
  totalApplications: number;
  approved: number;
  pending: number;
  complianceRate: number;
  waterUsage: number; // in millions of liters
}

interface ApplicationTrend {
  month: string;
  applications: number;
  approved: number;
  averageProcessingTime: number;
}

const mockRegionalData: RegionalData[] = [
  {
    province: "Kigali",
    totalApplications: 234,
    approved: 198,
    pending: 36,
    complianceRate: 96.2,
    waterUsage: 145.7
  },
  {
    province: "Northern Province",
    totalApplications: 89,
    approved: 76,
    pending: 13,
    complianceRate: 94.8,
    waterUsage: 67.3
  },
  {
    province: "Eastern Province",
    totalApplications: 156,
    approved: 142,
    pending: 14,
    complianceRate: 97.8,
    waterUsage: 98.2
  },
  {
    province: "Southern Province",
    totalApplications: 78,
    approved: 71,
    pending: 7,
    complianceRate: 95.1,
    waterUsage: 54.9
  },
  {
    province: "Western Province",
    totalApplications: 67,
    approved: 59,
    pending: 8,
    complianceRate: 92.3,
    waterUsage: 43.8
  }
];

const mockTrendData: ApplicationTrend[] = [
  { month: "Oct 2023", applications: 45, approved: 38, averageProcessingTime: 14.2 },
  { month: "Nov 2023", applications: 52, approved: 47, averageProcessingTime: 13.8 },
  { month: "Dec 2023", applications: 48, approved: 44, averageProcessingTime: 12.9 },
  { month: "Jan 2024", applications: 63, approved: 58, averageProcessingTime: 11.7 },
  { month: "Feb 2024", applications: 71, approved: 66, averageProcessingTime: 10.8 },
  { month: "Mar 2024", applications: 89, approved: 82, averageProcessingTime: 9.5 }
];

const applicationTypeData = [
  { type: "Industrial", count: 234, icon: Factory, color: "bg-blue-500" },
  { type: "Agricultural", count: 189, icon: Tractor, color: "bg-green-500" },
  { type: "Domestic", count: 156, icon: Building, color: "bg-purple-500" },
  { type: "Commercial", count: 87, icon: Building, color: "bg-orange-500" }
];

export function ExecutiveOverview() {
  const totalApplications = mockRegionalData.reduce((sum, region) => sum + region.totalApplications, 0);
  const totalApproved = mockRegionalData.reduce((sum, region) => sum + region.approved, 0);
  const totalPending = mockRegionalData.reduce((sum, region) => sum + region.pending, 0);
  const overallComplianceRate = mockRegionalData.reduce((sum, region) => sum + region.complianceRate, 0) / mockRegionalData.length;
  const totalWaterUsage = mockRegionalData.reduce((sum, region) => sum + region.waterUsage, 0);

  const currentMonth = mockTrendData[mockTrendData.length - 1];
  const previousMonth = mockTrendData[mockTrendData.length - 2];
  const applicationTrend = ((currentMonth.applications - previousMonth.applications) / previousMonth.applications) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Executive Overview
          </h2>
          <p className="text-muted-foreground">
            Strategic insights and system-wide performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">National Overview</span>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {applicationTrend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={applicationTrend > 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(applicationTrend).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalApproved / totalApplications) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {totalApproved} of {totalApplications} approved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Compliance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallComplianceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              National average compliance
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
            <Droplet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWaterUsage.toFixed(0)}ML</div>
            <p className="text-xs text-muted-foreground">
              Total allocated per day
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance</CardTitle>
          <CardDescription>
            Water permit applications and compliance by province
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRegionalData.map((region) => (
              <div key={region.province} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{region.province}</div>
                    <div className="text-sm text-muted-foreground">
                      {region.approved}/{region.totalApplications} approved • {region.waterUsage}ML/day
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Compliance</div>
                    <div className="text-sm text-muted-foreground">{region.complianceRate}%</div>
                  </div>
                  <div className="w-20">
                    <Progress value={region.complianceRate} className="h-2" />
                  </div>
                  {region.pending > 0 && (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                      {region.pending} pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Types Distribution */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Types</CardTitle>
            <CardDescription>
              Distribution of permit applications by sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationTypeData.map((type) => {
                const Icon = type.icon;
                const percentage = (type.count / totalApplications) * 100;
                return (
                  <div key={type.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${type.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{type.type}</div>
                        <div className="text-sm text-muted-foreground">{type.count} applications</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{percentage.toFixed(1)}%</div>
                      <div className="w-16 mt-1">
                        <Progress value={percentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Efficiency</CardTitle>
            <CardDescription>
              Average processing times and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                <div>
                  <div className="font-medium text-green-800">Current Average</div>
                  <div className="text-sm text-green-600">Processing time</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-800">
                    {currentMonth.averageProcessingTime} days
                  </div>
                  <div className="text-sm text-green-600">
                    {((previousMonth.averageProcessingTime - currentMonth.averageProcessingTime) / previousMonth.averageProcessingTime * 100).toFixed(1)}% improvement
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Recent Trends</div>
                {mockTrendData.slice(-3).map((trend, index) => (
                  <div key={trend.month} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{trend.month}</span>
                    <div className="flex items-center gap-2">
                      <span>{trend.applications} apps</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{trend.averageProcessingTime} days avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Insights</CardTitle>
          <CardDescription>
            Key observations and recommendations for executive decision-making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Processing Efficiency Improving</div>
                  <div className="text-sm text-muted-foreground">
                    Average processing time reduced by 33% over 6 months
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Growing Industrial Demand</div>
                  <div className="text-sm text-muted-foreground">
                    Industrial applications increased 25% this quarter
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-medium">Western Province Attention</div>
                  <div className="text-sm text-muted-foreground">
                    Lowest compliance rate requires focused intervention
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-medium">Resource Optimization</div>
                  <div className="text-sm text-muted-foreground">
                    Consider increasing staff allocation to high-volume regions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 