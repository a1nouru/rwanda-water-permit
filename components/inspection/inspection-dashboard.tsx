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
      {/* User Profile Button - Top Left */}
      <div className="fixed top-4 left-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="flex items-center justify-start gap-2 p-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/applications" className="flex items-center cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>My Applications</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Inspection Dashboard</h1>
          <p className="text-muted-foreground">
            Manage water permit applications and track inspection progress
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