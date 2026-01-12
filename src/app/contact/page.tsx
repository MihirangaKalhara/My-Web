"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowLeft, Send, Facebook as FacebookIcon } from "lucide-react";

// --- Custom WhatsApp Icon ---
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactPage() {
  
  // Form Data තබා ගැනීමට State එකක්
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  // Input වෙනස් වන විට State update කිරීම
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = "mihirangakalhara789@gmail.com";
    const subject = `New Contact from Portfolio: ${formData.firstName} ${formData.lastName}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}
User Email: ${formData.email}
Message:
${formData.message}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* BACKGROUND NOISE & GRID */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Navigation Back */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </nav>

        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* LEFT SIDE: Contact Info */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Let’s start a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">conversation.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Interested in working together? I'm available for freelance projects and open to discussing new opportunities. Let's build something extraordinary together.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <motion.div variants={itemVariants} className="space-y-4">
              
              {/* Email Card */}
              <a href="mailto:mihirangakalhara789@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all group">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Direct Mail</h3>
                  <p className="text-white font-bold text-lg">Email Me</p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a href="https://wa.me/94763116441" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#25D366]/50 hover:bg-white/10 transition-all group">
                <div className="p-3 rounded-lg bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <WhatsAppIcon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Instant Support</h3>
                  <p className="text-white font-bold text-lg">Chat on WhatsApp</p>
                </div>
              </a>

              {/* Facebook Card */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#1877F2]/50 hover:bg-white/10 transition-all group">
                <div className="p-3 rounded-lg bg-[#1877F2]/10 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                  <FacebookIcon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Social Media</h3>
                  <p className="text-white font-bold text-lg">Connect on Facebook</p>
                </div>
              </a>

            </motion.div>

            {/* Social Links Row */}
            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Follow me on</h3>
              <div className="flex gap-4">
                <a href="https://github.com/MihirangaKalhara" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-black hover:border-white transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Contact Form (Now with auto-fill logic) */}
          <motion.div 
            variants={itemVariants} 
            className="bg-[#111] p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Form Glow Effect */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>

            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            
            <form onSubmit={handleSend} className="space-y-5 relative z-10">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Mihiranga" 
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Kalhara" 
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mihiranga@example.com" 
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Your Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type here..." 
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all group shadow-lg shadow-blue-900/20"
              >
                Send Message 
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </motion.div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-xs text-gray-600">
        © 2026 Mihiranga Kalhara. All rights reserved.
      </footer>
    </div>
  );
}