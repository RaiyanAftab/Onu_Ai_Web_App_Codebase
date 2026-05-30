"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  
  return (
    <div className="bg-[#050505] text-[#D9D9D9] font-[family-name:var(--font-space)] min-h-screen selection:bg-blue-500/30">
      
      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div className="font-bold tracking-[0.3em] text-xl">Onu.AI</div>
        <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase">
           <Link href='/workspace' className="hover:text-blue-400 transition-colors">WORKSPACE</Link>
           <Link href='/enterprise' className="hover:text-blue-400 transition-colors">ENTERPRISE</Link>
           <Link href='/pricing' className="hover:text-blue-400 transition-colors">PRICING</Link>
           <Link href="/developer" className="hover:text-blue-400 transition-colors">DEVELOPER API</Link>
        </div>
      </header>

      {/* SECTION 1: THE KINETIC HERO */}
      <section className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        {/* Massive Spinning Orb / Node visualization */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] border border-white/5 rounded-full flex items-center justify-center opacity-30 pointer-events-none"
        >
          <div className="w-[600px] h-[600px] border border-blue-500/20 rounded-full flex items-center justify-center">
            <div className="w-[400px] h-[400px] border border-blue-400/40 rounded-full flex items-center justify-center">
               <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_30px_rgba(59,130,246,1)]"></div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center flex flex-col items-center mt-12"
        >
          <h1 className="text-6xl md:text-[8vw] font-medium tracking-tighter leading-[0.85] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            NEURAL MARKET<br/>INTELLIGENCE.
          </h1>
          <p className="text-sm md:text-base text-white/50 max-w-xl font-sans normal-case leading-relaxed px-6 mb-12">
            A testing engine simulating 1,500 active consumer profiles to stress-test your marketing assets against deep audience disconnect risks before public deployment.
          </p>
          <div className="flex gap-4 relative z-20">
             <Link href='/workspace' className="bg-white text-black px-8 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
               LAUNCH ENGINE
             </Link>
             <Link href='/enterprise' className="border border-white/20 text-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-colors cursor-pointer">
               THE BRAND VAULT
             </Link>
          </div>
        </motion.div>

        {/* Ticker Tape */}
        <div className="absolute bottom-0 w-full flex overflow-hidden border-t border-white/10 py-3 bg-black">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap text-[10px] tracking-[0.3em] font-bold text-white/40"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">INITIALIZING AI AUDIENCE PANEL • RUNNING LOCATION ACCURACY SCORE • READING YOUR CAMPAIGN HISTORY •</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BRUTALIST REVEAL (The Problem) */}
      <section className="min-h-[80vh] w-full flex items-center justify-center px-6 border-b border-white/10 bg-[#0A0A0A]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-24"
        >
           <div>
             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none mb-8">
               YOU ARE<br/>FLYING<br/><span className="text-red-600">BLIND.</span>
             </h2>
           </div>
           <div className="border-l-4 border-red-600 pl-8 md:pl-12">
              <p className="text-2xl md:text-4xl font-light tracking-tight text-white/90 leading-snug mb-8 font-[family-name:var(--font-playfair)] italic">
                "Up to 45% of localized digital ad spend underperforms due to demographic misalignment and undetected cultural friction."
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-white/40">
                <div className="w-8 h-px bg-white/40"></div>
                SOURCE: NIELSEN BANGLADESH DIGITAL CONSUMER REPORT
              </div>
           </div>
        </motion.div>
      </section>

      {/* SECTION 3: THE ARCHITECTURE (The Swarm) */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] border-b border-white/10 py-24">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-blue-500 text-[10px] font-bold tracking-[0.3em] mb-4">[ THE TESTING ENGINE ]</div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white">1,500 CONSUMER PROFILES</h2>
        </motion.div>
        
        {/* Interactive Swarm Grid */}
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-12 md:grid-cols-20 gap-1 md:gap-2 opacity-50">
            {[...Array(200)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0.1, scale: 0.8 }}
                whileInView={{ 
                  opacity: [0.1, 1, 0.3],
                  scale: [0.8, 1, 0.9],
                  backgroundColor: ["#111", "#3B82F6", "#111"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                viewport={{ once: false, margin: "-100px" }}
                className="aspect-square bg-[#111] rounded-sm"
              />
            ))}
          </div>
        </div>
        <div className="mt-16 text-center max-w-2xl px-6">
          <p className="text-sm text-white/50 font-sans normal-case leading-relaxed">
            We don't rely on static surveys. Onu.AI orchestrates a massive simulated swarm of localized audience profiles, mapping demographic archetypes to your exact geographic coordinates.
          </p>
        </div>
      </section>

      {/* SECTION 4: ENTERPRISE COMMAND CENTER SHOWCASE (Bento Grid) */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 bg-[#0A0A0A] border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto"
        >
           <div className="text-center mb-12">
             <div className="inline-block bg-white/10 px-3 py-1 text-[10px] tracking-widest font-bold mb-4 w-max">ENTERPRISE TIER</div>
             <h2 className="text-4xl font-medium tracking-tighter text-white">THE BRAND VAULT</h2>
           </div>

           {/* High-Fidelity Bento Grid UI Mockups */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[60vh] md:max-h-[600px]">
              
              {/* Radar Mockup */}
              <div className="col-span-12 md:col-span-7 bg-[#111] border border-white/10 p-8 flex flex-col relative overflow-hidden group min-h-[300px]">
                 <div className="absolute top-4 right-4 text-[8px] text-white/30 tracking-widest">MODULE: GEO_DECAY</div>
                 <h3 className="text-lg font-bold tracking-widest mb-2 z-10 text-white group-hover:text-emerald-500 transition-colors">REGIONAL REACH SCORE</h3>
                 <p className="text-[10px] text-white/50 mb-8 max-w-xs z-10">Calculates exact Data Confidence via distance from Major internet centres.</p>
                 
                 <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 md:w-96 md:h-96 border border-emerald-500/20 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-48 h-48 md:w-64 md:h-64 border border-emerald-500/40 rounded-full flex items-center justify-center">
                       <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500/10 rounded-full"></div>
                       <div className="absolute w-full h-px bg-emerald-500/30"></div>
                       <div className="absolute h-full w-px bg-emerald-500/30"></div>
                    </div>
                 </div>
              </div>

              {/* RAG Mockup */}
              <div className="col-span-12 md:col-span-5 bg-[#111] border border-white/10 p-8 flex flex-col relative overflow-hidden group min-h-[300px]">
                 <div className="absolute top-4 right-4 text-[8px] text-white/30 tracking-widest">MODULE: HISTORICAL_RAG</div>
                 <h3 className="text-lg font-bold tracking-widest mb-2 z-10 text-white group-hover:text-blue-500 transition-colors">ROI BASELINE</h3>
                 <p className="text-[10px] text-white/50 mb-8 max-w-[200px] z-10">Cross-references proprietary historical PDFs for exact ROI projection.</p>
                 
                 {/* Abstract Chart */}
                 <div className="flex-grow flex items-end gap-2 px-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-1/4 bg-blue-900/50 h-1/4"></div>
                    <div className="w-1/4 bg-blue-800/50 h-2/4"></div>
                    <div className="w-1/4 bg-blue-700/50 h-3/4"></div>
                    <div className="w-1/4 bg-blue-500 h-full relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-blue-400 font-bold">+140%</div>
                    </div>
                 </div>
              </div>

              {/* PR Crisis Mockup */}
              <div className="col-span-12 bg-[#111] border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden group min-h-[200px] gap-8">
                 <div className="absolute top-4 right-4 text-[8px] text-white/30 tracking-widest">MODULE: PR_SANDBOX</div>
                 <div className="md:w-1/3">
                   <h3 className="text-lg font-bold tracking-widest mb-2 z-10 text-white group-hover:text-red-500 transition-colors">HOSTILE NARRATIVE</h3>
                   <p className="text-[10px] text-white/50 z-10">Simulates backlash scenarios to identify reputational risks.</p>
                 </div>

                 {/* Abstract Tweet */}
                 <div className="w-full md:w-2/3 max-w-md bg-white border-l-4 border-red-500 p-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="font-bold text-[10px] text-black">Simulated Node_842</div>
                        <div className="w-48 h-2 bg-gray-200 mt-2"></div>
                        <div className="w-32 h-2 bg-gray-200 mt-2"></div>
                        <div className="mt-4 flex gap-4 text-[8px] text-gray-500">
                          <span>💬 4.2k</span>
                          <span>🔄 12k</span>
                          <span className="text-red-500">❤️ 45k Likes</span>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

           </div>
        </motion.div>
      </section>

      {/* SECTION 5: THE TERMINAL CTA */}
      <section className="h-[60vh] w-full flex flex-col items-center justify-center bg-[#050505]">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="text-center z-10 px-6"
         >
            <div className="text-[10px] text-white/40 tracking-[0.5em] mb-8 font-mono">SYSTEM READY</div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-12">
              STOP GUESSING.
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <Link 
                 href='/workspace'
                 className="bg-white text-black px-12 py-5 font-bold tracking-[0.2em] text-[10px] hover:bg-blue-500 hover:text-white transition-colors w-full md:w-auto"
               >
                 LAUNCH SIMULATOR ENGINE
               </Link>
               <Link 
                 href='/pricing'
                 className="bg-transparent border border-white/20 text-white px-12 py-5 font-bold tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-colors w-full md:w-auto"
               >
                 VIEW PRICING TIERS
               </Link>
            </div>
         </motion.div>
      </section>

    </div>
  );
}
