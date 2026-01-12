"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

// --- ALL COUNTRY CODES LIST ---
const countryCodes = [
  { code: "+94", country: "LK", name: "Sri Lanka" },
  { code: "+1", country: "US", name: "United States" },
  { code: "+44", country: "UK", name: "United Kingdom" },
  { code: "+91", country: "IN", name: "India" },
  { code: "+61", country: "AU", name: "Australia" },
  { code: "+93", country: "AF", name: "Afghanistan" },
  { code: "+355", country: "AL", name: "Albania" },
  { code: "+213", country: "DZ", name: "Algeria" },
  { code: "+376", country: "AD", name: "Andorra" },
  { code: "+244", country: "AO", name: "Angola" },
  { code: "+54", country: "AR", name: "Argentina" },
  { code: "+374", country: "AM", name: "Armenia" },
  { code: "+43", country: "AT", name: "Austria" },
  { code: "+994", country: "AZ", name: "Azerbaijan" },
  { code: "+973", country: "BH", name: "Bahrain" },
  { code: "+880", country: "BD", name: "Bangladesh" },
  { code: "+375", country: "BY", name: "Belarus" },
  { code: "+32", country: "BE", name: "Belgium" },
  { code: "+975", country: "BT", name: "Bhutan" },
  { code: "+55", country: "BR", name: "Brazil" },
  { code: "+359", country: "BG", name: "Bulgaria" },
  { code: "+855", country: "KH", name: "Cambodia" },
  { code: "+1", country: "CA", name: "Canada" },
  { code: "+86", country: "CN", name: "China" },
  { code: "+57", country: "CO", name: "Colombia" },
  { code: "+385", country: "HR", name: "Croatia" },
  { code: "+53", country: "CU", name: "Cuba" },
  { code: "+357", country: "CY", name: "Cyprus" },
  { code: "+420", country: "CZ", name: "Czech Republic" },
  { code: "+45", country: "DK", name: "Denmark" },
  { code: "+20", country: "EG", name: "Egypt" },
  { code: "+358", country: "FI", name: "Finland" },
  { code: "+33", country: "FR", name: "France" },
  { code: "+995", country: "GE", name: "Georgia" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+30", country: "GR", name: "Greece" },
  { code: "+852", country: "HK", name: "Hong Kong" },
  { code: "+36", country: "HU", name: "Hungary" },
  { code: "+354", country: "IS", name: "Iceland" },
  { code: "+62", country: "ID", name: "Indonesia" },
  { code: "+98", country: "IR", name: "Iran" },
  { code: "+964", country: "IQ", name: "Iraq" },
  { code: "+353", country: "IE", name: "Ireland" },
  { code: "+972", country: "IL", name: "Israel" },
  { code: "+39", country: "IT", name: "Italy" },
  { code: "+81", country: "JP", name: "Japan" },
  { code: "+962", country: "JO", name: "Jordan" },
  { code: "+7", country: "KZ", name: "Kazakhstan" },
  { code: "+254", country: "KE", name: "Kenya" },
  { code: "+965", country: "KW", name: "Kuwait" },
  { code: "+60", country: "MY", name: "Malaysia" },
  { code: "+960", country: "MV", name: "Maldives" },
  { code: "+52", country: "MX", name: "Mexico" },
  { code: "+977", country: "NP", name: "Nepal" },
  { code: "+31", country: "NL", name: "Netherlands" },
  { code: "+64", country: "NZ", name: "New Zealand" },
  { code: "+47", country: "NO", name: "Norway" },
  { code: "+968", country: "OM", name: "Oman" },
  { code: "+92", country: "PK", name: "Pakistan" },
  { code: "+63", country: "PH", name: "Philippines" },
  { code: "+48", country: "PL", name: "Poland" },
  { code: "+351", country: "PT", name: "Portugal" },
  { code: "+974", country: "QA", name: "Qatar" },
  { code: "+40", country: "RO", name: "Romania" },
  { code: "+7", country: "RU", name: "Russia" },
  { code: "+966", country: "SA", name: "Saudi Arabia" },
  { code: "+65", country: "SG", name: "Singapore" },
  { code: "+27", country: "ZA", name: "South Africa" },
  { code: "+82", country: "KR", name: "South Korea" },
  { code: "+34", country: "ES", name: "Spain" },
  { code: "+46", country: "SE", name: "Sweden" },
  { code: "+41", country: "CH", name: "Switzerland" },
  { code: "+66", country: "TH", name: "Thailand" },
  { code: "+90", country: "TR", name: "Turkey" },
  { code: "+380", country: "UA", name: "Ukraine" },
  { code: "+971", country: "UAE", name: "United Arab Emirates" },
  { code: "+84", country: "VN", name: "Vietnam" }
];

export default function SignUpPage() {
  const router = useRouter();

  // State Variables
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+94", 
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update Input Values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validations
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Database API Call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: `${formData.countryCode} ${formData.phone}`,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Success -> Verify Page
        router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col relative overflow-hidden">
      
      {/* BACKGROUND NOISE & GRID */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      {/* Navigation Back */}
      <div className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
      </div>

      {/* Sign Up Form Content */}
      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-lg bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 text-sm">Join us to manage your projects</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase">First Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-gray-500" />
                  <input type="text" name="firstName" placeholder="Mihiranga" required onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase">Last Name</label>
                <input type="text" name="lastName" placeholder="Kalhara" required onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
              </div>
            </div>

            {/* Phone Number with ALL Country Codes */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase">Phone Number</label>
              <div className="flex gap-2">
                <div className="relative w-[140px]">
                  <select 
                    name="countryCode" 
                    value={formData.countryCode} 
                    onChange={handleChange} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-3 text-sm text-white focus:border-blue-500 focus:outline-none appearance-none cursor-pointer truncate"
                  >
                    {countryCodes.map((c, index) => (
                      <option key={index} value={c.code} className="bg-black text-white">
                        {c.code} ({c.country})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-grow">
                  <Phone size={16} className="absolute left-3 top-3.5 text-gray-500" />
                  <input type="tel" name="phone" placeholder="77 123 4567" required onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-gray-500" />
                <input type="email" name="email" placeholder="mihiranga@example.com" required onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-gray-500" />
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a password" required onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-10 py-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-white">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-gray-500" />
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Repeat password" required onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-10 py-3 text-sm text-white focus:border-blue-500 focus:outline-none" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-white">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs text-center bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}

            {/* Submit Button */}
            <button 
              disabled={isLoading} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] mt-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Confirm & Sign Up"}
            </button>

          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Login here</Link>
          </p>
        </motion.div>
      </div>

      <footer className="py-6 text-center text-xs text-gray-600 relative z-10">
        © 2026 Mihiranga Kalhara. All rights reserved.
      </footer>
    </div>
  );
}