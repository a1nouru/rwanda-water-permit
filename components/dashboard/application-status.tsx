"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, FileText, TrendingUp } from "lucide-react";

interface Application {
  id: string;
  title: string;
  date: string;
  status: string;
  type: string;
  location: string;
}

interface ApplicationStatusProps {
  applications: Application[];
}

export function ApplicationStatus({ applications }: ApplicationStatusProps) {
  const pending = applications.filter(app => app.status === "pending").length;
  const approved = applications.filter(app => app.status === "approved").length;
  const total = applications.length;
  
  // Calculate this month's activity
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthApps = applications.filter(app => {
    const appDate = new Date(app.date);
    return appDate.getMonth() === currentMonth && appDate.getFullYear() === currentYear;
  }).length;

  const statusItems = [
    {
      title: "Total Applications",
      value: total.toString(),
      description: "All applications submitted",
      detail: "Complete application history",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Pending Reviews",
      value: pending.toString(),
      description: "Applications under review",
      detail: "Awaiting authority decision",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Approved Permits",
      value: approved.toString(),
      description: "Successfully approved applications",
      detail: "Ready for permit issuance",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "This Month",
      value: thisMonthApps.toString(),
      description: "Applications submitted this month",
      detail: "Current month activity",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="h-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">{item.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                  </div>
                  <div className="text-gray-400 ml-4 mt-1">
                    {item.icon}
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-medium text-gray-700 mb-1">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
             {/* Application Summary */}
       <Card className="border border-gray-200 bg-white shadow-sm">
         <CardContent className="p-6">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div>
               <h3 className="text-lg font-semibold text-gray-900">Application Summary</h3>
               <p className="text-sm text-gray-600">Overview of your application status</p>
             </div>
           </div>
         </CardContent>
       </Card>
    </div>
  );
} 