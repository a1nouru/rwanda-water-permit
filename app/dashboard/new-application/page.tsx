"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ApplicationForm } from "@/components/dashboard/application-form";
import { PaymentNotice } from "@/components/dashboard/payment-notice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewApplicationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // This would typically come from a user context/state in a real application
  const userData = {
    email: "jane.doe@example.com",
    name: "Jane Doe",
    phone: "+250 789 123 456",
    address: "KN 5 Ave, Kigali, Rwanda",
    idNumber: "1 1980 8 0123456 7 89",
  };
  
  const handleSubmitApplication = async (formData: any) => {
    setIsLoading(true);
    
    // In a real application, this would make an API call to submit the application
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard on success
      router.push("/dashboard?success=true");
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold">New Water Permit Application</h1>
            <p className="text-muted-foreground mt-2">
              Please fill out the form below to submit your water permit application.
            </p>
          </div>
          
          <PaymentNotice />
          
          <ApplicationForm 
            userData={userData}
            onSubmit={handleSubmitApplication}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 