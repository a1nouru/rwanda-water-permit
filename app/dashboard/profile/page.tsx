"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Camera, Check, Pencil, User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"applications">("applications");
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - in a real app this would come from a user context or API
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+250 789 123 456",
    address: "KN 5 Ave, Kigali, Rwanda",
    idNumber: "1 1980 8 0123456 7 89",
    initials: "JD",
    image: null,
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.image || undefined} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="icon" className="absolute bottom-0 right-1/3 rounded-full h-8 w-8">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload photo</span>
                  </Button>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account Status</span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm">January 2023</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Applications</span>
                    <span className="text-sm">3</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Account Settings</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="identification">Identification</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          defaultValue={user.name} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          defaultValue={user.email} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          defaultValue={user.phone} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          defaultValue={user.address} 
                          disabled={!isEditing} 
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex justify-end">
                        <Button className="mt-4">Save Changes</Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="identification" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID Number</Label>
                      <Input 
                        id="idNumber" 
                        defaultValue={user.idNumber} 
                        disabled={!isEditing} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ID Documents</Label>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <span>National ID Card</span>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex justify-end">
                        <Button className="mt-4">Save Changes</Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" disabled={!isEditing} />
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <Button className="mt-4">Update Password</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
} 