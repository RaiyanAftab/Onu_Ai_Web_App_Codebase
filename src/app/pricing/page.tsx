"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-[#D9D9D9] font-[family-name:var(--font-space)] uppercase text-xs tracking-wider selection:bg-blue-500/30">
      
      {/* Global Navigation Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050505]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-8">
          <Link href='/' className="font-bold text-white tracking-[0.2em] border border-white/20 px-3 py-1 bg-white/5 hover:bg-white hover:text-black transition-colors">
            Onu.AI
          </Link>
        </div>
        <div className="flex gap-6 items-center text-[10px] font-bold tracking-widest text-white/50">
          <Link href='/workspace' className="hover:text-white transition-colors">WORKSPACE</Link>
          <Link href='/enterprise' className="hover:text-white transition-colors">ENTERPRISE</Link>
          <button className="text-white border-b-2 border-white pb-1">PRICING</button>
           <Link href="/developer" className="hover:text-blue-400 transition-colors">DEVELOPER API</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        
        <div className="text-center mb-24">
          <div className="text-blue-500 text-[10px] font-bold tracking-[0.3em] mb-4">[ COGNITIVE COMPUTE ARCHITECTURE ]</div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-6">SCALABLE NEURAL PRICING.</h1>
          <p className="text-sm text-white/50 normal-case font-sans max-w-2xl mx-auto">
            We don't charge for software features. We charge for the massive cloud compute required to orchestrate a 1,500-profile AI audience panel. Purchase Test-Credits based on your campaign scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          
          {/* TIER 1: FREE DIAGNOSTIC */}
          <div className="bg-[#0A0A0A] p-12 flex flex-col">
            <div className="text-white/40 font-bold tracking-[0.3em] text-[10px] mb-4">TIER_01</div>
            <h2 className="text-3xl text-white font-light tracking-tighter mb-2">DIAGNOSTIC</h2>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-5xl font-bold text-white">৳0</span>
              <span className="text-xs text-white/40 mb-1">/ month</span>
            </div>
            
            <div className="bg-blue-900/20 text-blue-400 border border-blue-500/30 p-3 text-center mb-8 font-bold tracking-widest text-[10px]">
              30 NODE-HOURS INCLUDED
            </div>

            <ul className="space-y-4 mb-12 flex-grow text-[10px] text-white/60">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Test Static Visual Assets</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Test Digital OVCs (Max 15 Seconds)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Social Media Caption Testing</span>
              </li>
              <li className="flex items-start gap-3 opacity-30">
                <span className="text-red-500 mt-0.5">✕</span>
                <span>No TVC / Omnichannel Support</span>
              </li>
              <li className="flex items-start gap-3 opacity-30">
                <span className="text-red-500 mt-0.5">✕</span>
                <span>No Public reaction test</span>
              </li>
            </ul>

            <Link 
              href='/workspace?tier=free'
              className="w-full bg-white/10 text-white py-4 font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
            >
              LAUNCH ENGINE
            </Link>
          </div>

          {/* TIER 2: COMPUTE PACK */}
          <div className="bg-[#111] p-12 flex flex-col relative border-t-4 border-blue-500 shadow-2xl z-10 scale-105">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] font-bold tracking-widest px-3 py-1">MOST POPULAR FOR GROWTH BRANDS</div>
            <div className="text-blue-400 font-bold tracking-[0.3em] text-[10px] mb-4">TIER_02</div>
            <h2 className="text-3xl text-white font-light tracking-tighter mb-2">COMPUTE PACK</h2>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-5xl font-bold text-white">৳5K</span>
              <span className="text-xs text-white/40 mb-1">/ one-time</span>
            </div>
            
            <div className="bg-blue-600 text-white border border-blue-400 p-3 text-center mb-8 font-bold tracking-widest text-[10px] shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              +50 NODE-HOURS TOP-UP
            </div>

            <ul className="space-y-4 mb-12 flex-grow text-[10px] text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Everything in Diagnostic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Volume testing for TikToks/Reels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>Unused node-hours roll over (never expire)</span>
              </li>
              <li className="flex items-start gap-3 opacity-30">
                <span className="text-red-500 mt-0.5">✕</span>
                <span>No Extended TVC Support</span>
              </li>
              <li className="flex items-start gap-3 opacity-30">
                <span className="text-red-500 mt-0.5">✕</span>
                <span>No Public reaction test</span>
              </li>
            </ul>

            <button className="w-full bg-blue-600 text-white py-4 font-bold tracking-[0.2em] hover:bg-blue-500 transition-colors shadow-lg">
              PURCHASE NODES
            </button>
          </div>

          {/* TIER 3: BRAND VAULT */}
          <div className="bg-[#0A0A0A] p-12 flex flex-col">
            <div className="text-emerald-500 font-bold tracking-[0.3em] text-[10px] mb-4">TIER_03</div>
            <h2 className="text-3xl text-white font-light tracking-tighter mb-2">BRAND VAULT</h2>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-5xl font-bold text-white">CUSTOM</span>
            </div>
            
            <div className="bg-emerald-900/20 text-emerald-400 border border-emerald-500/30 p-3 text-center mb-8 font-bold tracking-widest text-[10px]">
              STARTING AT 250 NODE-HOURS
            </div>

            <ul className="space-y-4 mb-12 flex-grow text-[10px] text-white/60">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span className="text-white">Unlocks Extended TVC Analysis (60s+)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span className="text-white">Fully Unlocked 9-Point Cognitive Diagnostic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span className="text-white">Public reaction test Simulation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span className="text-white">Campaign performance library Integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span className="text-white">Regional reach score Mapping</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span className="text-white">Executive Boardroom PDF Export</span>
              </li>
            </ul>

            <div className="flex flex-col gap-3">
              <Link 
                href='/workspace'
                className="w-full bg-emerald-500 text-black py-4 font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                ENTER BRAND VAULT
              </Link>
              <Link 
                href='/enterprise'
                className="w-full border border-white/10 text-white/50 py-2 text-[9px] font-bold tracking-[0.2em] hover:text-white transition-colors"
              >
                INQUIRE FOR ACCESS
              </Link>
            </div>
          </div>

        </div>

        {/* Node Hour Conversion Key */}
        <div className="mt-16 p-8 border border-white/10 bg-[#050505] text-center max-w-3xl mx-auto">
          <div className="text-[10px] text-white/40 tracking-[0.3em] font-bold mb-6">NODE-HOUR CONVERSION RATE</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-white font-bold">Social Caption</div>
              <div className="text-blue-500 font-mono mt-1">0.5 Nodes</div>
            </div>
            <div>
              <div className="text-white font-bold">Static Poster</div>
              <div className="text-blue-500 font-mono mt-1">1.0 Node</div>
            </div>
            <div>
              <div className="text-white font-bold">15-Second OVC</div>
              <div className="text-blue-500 font-mono mt-1">5.0 Nodes</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
