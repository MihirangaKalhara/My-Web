"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle Login Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Call Login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Success: Save user to local storage (Simulating session)
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        
        // 3. Redirect to Home Page
        router.push("/");
      } else {
        // 4. Error: Show error message
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col relative overflow-hidden">
      
      {/* BACKGROUND NOISE & GRID EFFECTS */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      {/* BACK TO HOME LINK */}
      <div className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
      </div>

      {/* LOGIN CARD */}
      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@company.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all" 
                  required 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                {/* FORGOT PASSWORD LINK */}
                <Link href="/forgot-password" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}

            {/* Submit Button */}
            <button 
              disabled={isLoading} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-lg transition-all shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account? <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Sign up</Link>
          </p>
        </motion.div>
      </div>

      <footer className="py-6 text-center text-xs text-gray-600 relative z-10">
        © 2026 Mihiranga Kalhara. All rights reserved.
      </footer>
    </div>
  );
}