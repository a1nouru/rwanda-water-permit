"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PinVerification } from "@/components/auth/pin-verification";
import { SuccessConfirmation } from "@/components/auth/success-confirmation";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function ApplyPage() {
  const [step, setStep] = useState<"signup" | "verify" | "success">("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<{
    email: string;
    accountType: string;
    details: any;
  }>({
    email: "",
    accountType: "",
    details: {}
  });

  const handleSignUp = (email: string, password: string, accountType: string, details: any) => {
    setIsLoading(true);
    
    // Store the user data for later use
    setUserData({
      email,
      accountType,
      details
    });
    
    // Simulate API call for registration
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
    }, 1500);
  };
  
  const handleVerifyPin = (pin: string) => {
    // In a real implementation, this would verify the PIN with an API
    setTimeout(() => {
      setStep("success");
    }, 1000);
  };
  
  const handleResendPin = () => {
    // Mock function to resend PIN
    console.log("Resending PIN to", userData.email);
  };

  return (
    <AuthLayout>
      {step === "signup" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <SignUpForm onSubmit={handleSignUp} />
        </motion.div>
      )}
      
      {step === "verify" && (
        <PinVerification 
          email={userData.email} 
          onSubmit={handleVerifyPin}
          onResendPin={handleResendPin}
        />
      )}
      
      {step === "success" && (
        <SuccessConfirmation email={userData.email} />
      )}
    </AuthLayout>
  );
} 