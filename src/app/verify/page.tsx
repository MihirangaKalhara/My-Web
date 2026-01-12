"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // URL එකෙන් ඊමේල් එක ගන්නවා

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000); // තත්පර 2කින් Login එකට යවන්න
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        
        {success ? (
          <div className="text-center">
            <div className="flex justify-center mb-4"><CheckCircle className="text-green-500" size={50} /></div>
            <h2 className="text-2xl font-bold">Verified!</h2>
            <p className="text-gray-400 mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Verify Email</h1>
              <p className="text-gray-400 text-sm mt-2">Enter the 6-digit code sent to <br/><span className="text-blue-400">{email}</span></p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="123456" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white text-center tracking-[5px] text-xl focus:border-blue-500 focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold flex justify-center">
                {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
              </button>
            </form>
            
            <div className="mt-6 text-center">
               <Link href="/signup" className="text-sm text-gray-500 hover:text-white flex items-center justify-center gap-2">
                 <ArrowLeft size={14}/> Back to Signup
               </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}