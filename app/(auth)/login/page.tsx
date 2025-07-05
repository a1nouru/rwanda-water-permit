"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  const router = useRouter();
  
  const handleLogin = async (email: string, password: string) => {
    // In a real application, you would handle authentication here
    // For now, just redirect to home after "login"
    console.log("Logging in with:", email);
    
    // Simulate successful login
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
} 