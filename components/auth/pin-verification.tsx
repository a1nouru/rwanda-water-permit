"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";

interface PinVerificationProps {
  email: string;
  onSubmit: (pin: string) => void;
  onResendPin: () => void;
}

export function PinVerification({ email, onSubmit, onResendPin }: PinVerificationProps) {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePinChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newPin = [...pin];
    
    // Handle paste of full PIN
    if (value.length > 1) {
      const digits = value.split("").slice(0, 4);
      for (let i = 0; i < digits.length; i++) {
        if (i + index < 4) {
          newPin[i + index] = digits[i];
        }
      }
      setPin(newPin);
      
      // Focus the appropriate input
      const nextIndex = Math.min(index + digits.length, 3);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Handle single digit
    newPin[index] = value;
    setPin(newPin);
    
    // Auto-focus next input if current one is filled
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to previous input on backspace if current is empty
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitPin = () => {
    const fullPin = pin.join("");
    if (fullPin.length !== 4) return;
    
    setIsLoading(true);
    onSubmit(fullPin);
  };

  const handleResendPin = () => {
    setIsResending(true);
    onResendPin();
    
    // Reset countdown
    setTimeout(() => {
      setIsResending(false);
      setCountdown(30);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a verification code to <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin">Enter 4-digit PIN</Label>
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={`pin-${index}`}
                    type="text"
                    maxLength={4}
                    value={pin[index]}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                  />
                ))}
              </div>
            </div>
            <Button 
              onClick={handleSubmitPin} 
              className="w-full" 
              disabled={pin.join("").length !== 4 || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendPin}
              disabled={countdown > 0 || isResending}
              className={`text-primary hover:underline font-medium ${
                countdown > 0 || isResending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isResending ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Resending...
                </span>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                "Resend Code"
              )}
            </button>
          </div>
          <div className="text-xs text-center text-muted-foreground">
            Please check your spam folder if you don&apos;t see the email in your inbox.
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 