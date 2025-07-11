"use client";

import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function PaymentNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
        <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300 font-medium text-base">
          Payment Required
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400 mt-2">
          <div className="space-y-4">
            <p className="leading-relaxed [&:not(:first-child)]:mt-6">Please ensure that you have submitted your payment via IREMBO before proceeding with this application.</p>
            <p className="leading-relaxed [&:not(:first-child)]:mt-6">You will need to attach proof of payment along with your application documents during submission.</p>
          </div>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
} 