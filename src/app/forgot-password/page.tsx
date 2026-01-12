"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, Loader2, KeyRound, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  // Steps: 1 = Email Input, 2 = Verify & Reset
  const [step, setStep] = useState(1);
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step 1: Send Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2); // Go to next step
      } else {
        setError(data.message); // Show "No account found" error
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password changed successfully!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Backgrounds */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        
        {success ? (
          <div className="text-center">
            <div className="flex justify-center mb-4"><CheckCircle className="text-green-500" size={50} /></div>
            <h2 className="text-2xl font-bold">Password Reset!</h2>
            <p className="text-gray-400 mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                {step === 1 ? "Forgot Password?" : "Reset Password"}
              </h1>
              <p className="text-gray-400 text-sm">
                {step === 1 
                  ? "Enter your email to receive a reset code." 
                  : `Enter the code sent to ${email}`}
              </p>
            </div>

            {/* STEP 1 FORM: EMAIL ONLY */}
            {step === 1 && (
              <form onSubmit={handleRequestCode} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="name@company.com" 
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none" 
                      required 
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                    <p className="text-red-500 text-sm">{error}</p>
                    {/* Error එක "No account found" නම් Sign up ලින්ක් එක පෙන්වන්න */}
                    {error.includes("No account found") && (
                      <Link href="/signup" className="text-xs text-blue-400 hover:text-blue-300 underline mt-1 block">
                        Create a new account here
                      </Link>
                    )}
                  </div>
                )}

                <button disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center disabled:opacity-50">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Send Code"}
                </button>
              </form>
            )}

            {/* STEP 2 FORM: CODE + NEW PASSWORDS */}
            {step === 2 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase">Verification Code</label>
                  <div className="relative">
                    <KeyRound size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input 
                      type="text" 
                      value={code} 
                      onChange={(e) => setCode(e.target.value)} 
                      placeholder="123456" 
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white tracking-widest focus:border-blue-500 focus:outline-none" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase">New Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase">Confirm Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-3.5 text-gray-500" />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none" required />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center disabled:opacity-50">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Reset Password"}
                </button>

                <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500 hover:text-white">
                  Change Email
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-gray-500 hover:text-white flex items-center justify-center gap-2">
                <ArrowLeft size={14}/> Back to Login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}