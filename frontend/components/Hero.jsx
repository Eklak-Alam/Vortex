"use client";
import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/taskService';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Server, Database, Code2, Activity, 
  Cpu, Globe, Layout, Container 
} from 'lucide-react';

const Hero = () => {
  const { data: tasks, isError, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAll,
    retry: 1, 
  });

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950 min-h-screen flex items-center border-b border-slate-900">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: The Pitch */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400 text-xs font-mono mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM_ONLINE // VORTEX_V1
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              The Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Full-Stack Architecture.
              </span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              This isn't just a todo app. It's a production-ready ecosystem. 
              <strong className="text-slate-200"> Next.js </strong> manages the UI, 
              <strong className="text-slate-200"> Java Spring Boot </strong> handles the logic, and 
              <strong className="text-slate-200"> Docker </strong> orchestrates the deployment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                suppressHydrationWarning
                onClick={() => document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3.5 rounded-xl font-bold transition shadow-lg shadow-cyan-900/20 hover:scale-105 active:scale-95"
              >
                <Activity className="h-5 w-5" /> Test The API
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-slate-300 border border-slate-700 hover:bg-slate-900 transition hover:text-white">
                <Code2 className="h-5 w-5" /> View Source
              </button>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono flex items-center gap-2">
                <Layout className="h-3 w-3 text-white" /> Next.js 14
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono flex items-center gap-2">
                <Cpu className="h-3 w-3 text-orange-500" /> Spring Boot 3
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono flex items-center gap-2">
                <Container className="h-3 w-3 text-blue-500" /> Docker
              </span>
            </div>
          </motion.div>

          {/* RIGHT: The Architecture Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* The Main Glass Container */}
            <div className="relative z-10 bg-slate-950/60 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Server className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Live Architecture</h3>
                    <p className="text-xs text-slate-500">Real-time Data Flow</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-xs text-slate-500">Uptime</div>
                  <div className="text-green-400 font-mono text-sm">99.9%</div>
                </div>
              </div>

              {/* The 3-Tier Flow Visual */}
              <div className="space-y-6 relative">
                
                {/* Connecting Line (Vertical) */}
                <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50 hidden sm:block" />

                {/* 1. FRONTEND */}
                <div className="relative flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-black border border-slate-800 flex items-center justify-center relative z-10 group-hover:border-white/50 transition duration-500">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 bg-slate-900/50 p-4 rounded-xl border border-slate-800 group-hover:bg-slate-900 transition">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-white">Client (Next.js)</span>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">Port 3000</span>
                    </div>
                    <p className="text-xs text-slate-500">React Query fetching JSON data.</p>
                  </div>
                </div>

                {/* 2. BACKEND */}
                <div className="relative flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-black border border-slate-800 flex items-center justify-center relative z-10 group-hover:border-orange-500/50 transition duration-500">
                    <Server className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1 bg-slate-900/50 p-4 rounded-xl border border-slate-800 group-hover:bg-slate-900 transition">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-white">API (Spring Boot)</span>
                      <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded">Port 8080</span>
                    </div>
                    <p className="text-xs text-slate-500">Processing logic & DTO mapping.</p>
                  </div>
                </div>

                {/* 3. DATABASE */}
                <div className="relative flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-black border border-slate-800 flex items-center justify-center relative z-10 group-hover:border-purple-500/50 transition duration-500">
                    <Database className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="flex-1 bg-slate-900/50 p-4 rounded-xl border border-slate-800 group-hover:bg-slate-900 transition">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-white">Data (MySQL)</span>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Port 3306</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">Persistent storage volume.</p>
                      {/* Live Counter */}
                      <span className="text-xs font-mono text-green-400 bg-green-900/20 px-2 py-0.5 rounded animate-pulse">
                        {tasks ? tasks.length : 0} Rows
                      </span>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Bottom Info */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>Latency: &lt;10ms</span>
                <span>Region: Localhost</span>
              </div>
            </div>

            {/* Glow Behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-3xl blur-3xl -z-10 opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;