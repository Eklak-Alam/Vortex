"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Terminal, LogIn } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition">
             <Terminal className="h-6 w-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Vortex<span className="text-cyan-400">.Dev</span>
          </span>
        </Link>

        {/* 2. RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* GitHub Icon - Visible on ALL Devices (Mobile & Desktop) */}
          <Link 
            href="https://github.com" 
            target="_blank" 
            className="text-slate-400 hover:text-white transition p-2 hover:bg-slate-800 rounded-full"
          >
            <Github className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;