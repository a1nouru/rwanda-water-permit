"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsPanel } from "./stats-panel"
import { ApplicationsTab } from "./applications-tab"
import { InspectionsTab } from "./inspections-tab"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  ClipboardList, 
  FileCheck,
  User,
  LogOut,
  FileText,
  Settings
} from "lucide-react"
import Link from "next/link"

export function InspectionDashboard() {
  const [activeTab, setActiveTab] = useState("applications")

  // For demo purposes - in a real app, this would come from auth state
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    initials: "JD",
    image: null,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">Water Resource Inspection</h1>
          <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground">
            Field inspection management and compliance monitoring
          </p>
        </div>
      </div>

      {/* Stats Panel */}
      <StatsPanel />

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Inspection Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Applications to Inspect
                <Badge variant="secondary" className="ml-2">12</Badge>
              </TabsTrigger>
              <TabsTrigger value="inspections" className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                My Inspections
                <Badge variant="secondary" className="ml-2">28</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="applications" className="mt-6">
              <ApplicationsTab />
            </TabsContent>
            <TabsContent value="inspections" className="mt-6">
              <InspectionsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 