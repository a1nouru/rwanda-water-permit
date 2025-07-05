"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";
import { Permit } from "./permits-list";

interface PermitStatusProps {
  permits: Permit[];
}

export function PermitStatus({ permits }: PermitStatusProps) {
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const active = permits.filter(permit => {
    const daysUntilExpiry = getDaysUntilExpiry(permit.expiryDate);
    return permit.status === "active" && daysUntilExpiry > 30;
  }).length;
  
  const expiringSoon = permits.filter(permit => {
    const daysUntilExpiry = getDaysUntilExpiry(permit.expiryDate);
    return permit.status === "active" && daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }).length;
  
  const expired = permits.filter(permit => 
    permit.status === "expired" || getDaysUntilExpiry(permit.expiryDate) <= 0
  ).length;
  
  const total = permits.length;
  
  const statusItems = [
    {
      title: "Active",
      value: active,
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-300",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Expiring Soon",
      value: expiringSoon,
      color: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-600 dark:text-amber-300",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      title: "Expired",
      value: expired,
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-600 dark:text-red-300",
      icon: <XCircle className="h-5 w-5" />,
    },
    {
      title: "Total Permits",
      value: total,
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-300",
      icon: <Clock className="h-5 w-5" />,
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