"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Layers, Cpu, ExternalLink, X, 
  ShoppingCart, Tag, Info, CheckCircle, Menu, User, LogOut
} from "lucide-react";

// --- PROJECT DATA ---
const projects = [
  {
    id: 1,
    title: "DM-BOX",
    category: "WhatsApp Automation",
    image: "/dmbox.jpg", 
    price: "LKR 1000.00", 
    duration: "/ 6 Months", 
    tech: ["Node.js", "Baileys Lib", "PostgreSQL"],
    description: "DM BOX is a highly advanced WhatsApp User Bot designed for power users.",
    details: "DM-BOX is the ultimate WhatsApp automation tool designed for efficiency. It features auto-reply capabilities, group management commands, anti-delete functions, and media downloaders. Optimized to run 24/7 with minimal latency."
  },
  {
    id: 2,
    title: "MihirangaMD",
    category: "WhatsApp User BOT",
    image: "/mihirangamd.png",
    price: "LKR 300.00", 
    duration: "/ Month", 
    tech: ["Node.js", "Baileys Lib", "Redis"],
    description: "A lightweight, fast, and feature-rich WhatsApp User Bot for personal use.",
    details: "MihirangaMD is a cost-effective, high-speed WhatsApp User Bot designed for personal automation. It features automated replies, media conversion tools (Sticker/Audio), group moderation utilities, and AI-powered chat responses. Powered by Redis for ultra-low latency, it ensures your WhatsApp experience is smoother and more productive."
  },
  {
    id: 3,
    title: "POINT OF SALES (POS SYSTEM)",
    category: "Business Solution",
    image: "/pos.png",
    price: "LKR 25000.00", 
    duration: "/ Year", 
    tech: ["React Native", "Firebase", "Stripe"],
    description: "Comprehensive retail management system with inventory and sales tracking.",
    details: "A robust Point of Sales system engineered for retail efficiency. It handles real-time inventory tracking, barcode scanning, employee management, and detailed sales analytics. With seamless Stripe integration for payments and Firebase for cloud syncing, business owners can manage multiple outlets from a single dashboard."
  }
];

// --- 1. PRELOADER COMPONENT ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute h-24 w-24 rounded-full border-t-2 border-l-2 border-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.h1 
          className="text-4xl font-bold tracking-tighter text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          M<span className="text-primary">.</span>
        </motion.h1>
      </div>
    </motion.div>
  );
};

// --- 3. PROJECT DETAILS MODAL ---
const ProjectModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()} 
        >
          <button onClick={onClose} className="absolute right-4 top-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"><X size={20} /></button>

          <div className="relative w-full h-64 md:h-80">
            <Image src={project.image} alt={project.title} fill className="object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6">
               <span className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">{project.category}</span>
               <h2 className="text-3xl font-bold text-white mt-2">{project.title}</h2>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{project.price}</span>
                <span className="text-sm text-gray-400">{project.duration}</span>
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                <ShoppingCart size={18} /> Buy Now
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
              <p className="text-gray-400 leading-relaxed">{project.details}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"><CheckCircle size={14} className="text-blue-500" /> {t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- 4. TOAST NOTIFICATION ---
const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 50, x: 50 }}
      className="fixed bottom-6 right-6 z-50 bg-[#111] border border-green-500/50 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
    >
      <div className="bg-green-500/20 p-2 rounded-full text-green-500"><CheckCircle size={24} /></div>
      <div><h4 className="font-bold text-sm">Success!</h4><p className="text-xs text-gray-400">{message}</p></div>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-white"><X size={16}/></button>
    </motion.div>
  );
};

// --- MAIN CONTENT COMPONENT ---
function PortfolioContent() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [loading]);

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      router.replace("/");
    }
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [searchParams, router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setMobileMenuOpen(false);
  };

  if (loading) return <Preloader onComplete={() => setLoading(false)} />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30">
      
      <AnimatePresence>
        {showToast && <Toast message="Your account has been verified successfully." onClose={() => setShowToast(false)} />}
      </AnimatePresence>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#0a0a0a]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">MIHIRANGA<span className="text-blue-500">.</span></Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            
            {currentUser ? (
               <div className="flex items-center gap-4">
                 <span className="flex items-center gap-2 text-white font-bold bg-blue-600/10 px-4 py-2 rounded-full border border-blue-600/30">
                    <User size={16} /> {currentUser.firstName}
                 </span>
                 <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="Logout"><LogOut size={20} /></button>
               </div>
            ) : (
              <Link href="/login" className="rounded-full bg-white/5 px-4 py-2 text-white hover:bg-white/10 transition-colors border border-white/5">Client Login</Link>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg border border-white/10 text-white hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm flex flex-col p-6 md:hidden">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold tracking-tight text-white">MIHIRANGA<span className="text-blue-500">.</span></span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300"><X size={28} /></button>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="w-full p-5 text-center text-lg font-medium text-white rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:bg-white/20">About</Link>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="w-full p-5 text-center text-lg font-medium text-white rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:bg-white/20">Projects</a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="w-full p-5 text-center text-lg font-medium text-white rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:bg-white/20">Skills</a>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full p-5 text-center text-lg font-medium text-white rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:bg-white/20">Contact</Link>
                <div className="h-px bg-white/10 my-2" />
                
                {currentUser ? (
                   <div className="flex flex-col gap-3">
                      <div className="w-full p-5 text-center text-lg font-bold text-white rounded-2xl bg-blue-600/20 border border-blue-500/30 flex justify-center items-center gap-2"><User size={20}/> Hello, {currentUser.firstName}</div>
                      <button onClick={handleLogout} className="w-full p-4 text-center text-red-400 rounded-2xl bg-red-900/10 border border-red-500/30 hover:bg-red-900/20">Logout</button>
                   </div>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full p-5 text-center text-lg font-bold text-white rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-600/10 border border-blue-500/30 backdrop-blur-xl shadow-lg hover:bg-blue-600/30">Client Login</Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16 text-4xl font-bold md:text-5xl text-white text-center">Our Projects</motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (index * 0.1) }} whileHover={{ y: -5 }} className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw"/>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors"/>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 flex-grow">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{project.tech.map((t) => (<span key={t} className="rounded bg-blue-500/10 px-2 py-1 text-xs text-blue-400">{t}</span>))}</div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold text-lg"><Tag size={16} className="text-blue-500" />{project.price}</div>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedProject(project)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Info size={20} /></button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"><ShoppingCart size={16} /> Purchase</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 md:text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Technical Arsenal</h2>
            <p className="mt-4 text-gray-400">The tools and technologies I use to bring ideas to life.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <motion.div whileHover={{ y: -5 }} className="col-span-1 md:col-span-2 p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500"><Code2 size={24}/></div>
                  <h3 className="text-xl font-semibold text-white">Frontend Engineering</h3>
                </div>
                <p className="text-gray-400 mb-6">Expertise in building scalable component systems and interactive UIs.</p>
                <div className="flex flex-wrap gap-2">{['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Redux', 'GraphQL'].map(tag => (<span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/5">{tag}</span>))}</div>
             </motion.div>
             <motion.div whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500"><Layers size={24}/></div>
                  <h3 className="text-xl font-semibold text-white">UI/UX Design</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-400">
                   <div className="flex justify-between"><span>Figma</span> <span className="text-white">Expert</span></div>
                   <div className="w-full h-1 bg-white/10 rounded-full"><div className="w-[95%] h-full bg-blue-500 rounded-full"/></div>
                   <div className="flex justify-between pt-2"><span>Prototyping</span> <span className="text-white">Advanced</span></div>
                   <div className="w-full h-1 bg-white/10 rounded-full"><div className="w-[85%] h-full bg-blue-500 rounded-full"/></div>
                </div>
             </motion.div>
             <motion.div whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500"><Cpu size={24}/></div>
                  <h3 className="text-xl font-semibold text-white">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2">{['Node.js', 'PostgreSQL', 'Prisma', 'Docker', 'AWS', 'Redis'].map(tag => (<span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/5">{tag}</span>))}</div>
             </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-500">© 2026 Mihiranga Kalhara. All rights reserved. Designed & Built with Next.js.</footer>
    </div>
  );
}

// --- EXPORT DEFAULT WITH SUSPENSE BOUNDARY ---
export default function Portfolio() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
