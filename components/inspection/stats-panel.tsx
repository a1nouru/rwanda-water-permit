"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ClipboardList, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  FileCheck
} from "lucide-react"

const stats = [
  {
    title: "Pending Inspections",
    value: "12",
    description: "Applications waiting for inspection",
    icon: ClipboardList,
    trend: "+2 this week",
    trendUp: true,
    color: "text-blue-600"
  },
  {
    title: "Completed This Month",
    value: "28",
    description: "Inspections completed in current month",
    icon: CheckCircle2,
    trend: "+15% from last month",
    trendUp: true,
    color: "text-green-600"
  },
  {
    title: "Overdue",
    value: "3",
    description: "Inspections past due date",
    icon: AlertTriangle,
    trend: "-1 from last week",
    trendUp: false,
    color: "text-red-600"
  },
  {
    title: "Compliance Rate",
    value: "92%",
    description: "Applications meeting requirements",
    icon: TrendingUp,
    trend: "+3% improvement",
    trendUp: true,
    color: "text-emerald-600"
  },
  {
    title: "Avg. Inspection Time",
    value: "2.5 hrs",
    description: "Average time per inspection",
    icon: Clock,
    trend: "-15 min from last month",
    trendUp: true,
    color: "text-purple-600"
  },
  {
    title: "Draft Reports",
    value: "5",
    description: "Inspections saved as draft",
    icon: FileCheck,
    trend: "Ready for completion",
    trendUp: null,
    color: "text-orange-600"
  }
]

export function StatsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
            <div className="flex items-center mt-2">
              {stat.trendUp !== null && (
                <Badge 
                  variant={stat.trendUp ? "default" : "secondary"}
                  className={`text-xs ${
                    stat.trendUp 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }`}
                >
                  {stat.trend}
                </Badge>
              )}
              {stat.trendUp === null && (
                <Badge variant="outline" className="text-xs">
                  {stat.trend}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 