"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { PinVerification } from "@/components/auth/pin-verification";
import { SuccessConfirmation } from "@/components/auth/success-confirmation";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "verify" | "success">("signup");
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
    // Store the user data for later use
    setUserData({
      email,
      accountType,
      details
    });
    
    // In a real app, you would handle registration here with the API
    console.log("Sign up details:", { email, password, accountType, details });
    
    // Move to verification step
    setStep("verify");
  };
  
  const handleVerifyPin = (pin: string) => {
    // In a real implementation, this would verify the PIN with an API
    console.log("Verifying PIN:", pin);
    
    // Move to success step
    setTimeout(() => {
      setStep("success");
    }, 1000);
  };
  
  const handleResendPin = () => {
    // Mock function to resend PIN
    console.log("Resending PIN to", userData.email);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
      <div className="w-full max-w-md">
        {step === "signup" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
          <SuccessConfirmation 
            email={userData.email} 
            showApplyButton={false}
            redirectUrl="/dashboard"
            redirectLabel="Go to Dashboard"
          />
        )}
      </div>
    </div>
  );
} 