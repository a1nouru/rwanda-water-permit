"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle } from "lucide-react";

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
  const rejected = applications.filter(app => app.status === "rejected").length;
  const total = applications.length;
  
  const statusItems = [
    {
      title: "Pending",
      value: pending,
      color: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-600 dark:text-amber-300",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Approved",
      value: approved,
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-300",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Rejected",
      value: rejected,
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-600 dark:text-red-300",
      icon: <XCircle className="h-5 w-5" />,
    },
    {
      title: "Total",
      value: total,
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-300",
      icon: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statusItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              {item.icon && (
                <div className={`p-2 rounded-full ${item.color}`}>
                  <div className={item.textColor}>{item.icon}</div>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className={`text-2xl font-bold ${item.textColor}`}>
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 