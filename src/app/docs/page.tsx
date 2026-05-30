"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DocsState } from "@/lib/docs-state";
import mermaid from "mermaid";
import {
  BookOpen,
  Terminal,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Database,
  ArrowRightLeft,
  Users,
  Lock,
  Download,
  FileText,
  Activity,
  Server,
  Network
} from "lucide-react";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"pitch" | "architecture" | "system" | "team">("pitch");
  const [state, setState] = useState<DocsState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    fetch(`/api/docs/state?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data: DocsState) => {
        setState(data);

        // Access Control Logic
        if (!data.visibility) {
          setIsLocked(true);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // Initialize Mermaid on Architecture Tab load
  useEffect(() => {
    if (activeTab === "architecture" && !isLocked && !isLoading) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "dark",
        securityLevel: "loose",
        fontFamily: "Inter, sans-serif"
      });
      mermaid.contentLoaded();
    }
  }, [activeTab, isLocked, isLoading]);

  const exportMarkdown = () => {
    if (!state) return;
    const mdContent = `
# onu.ai - Documentation & Pitch Deck

## The Problem
${state.pitchDeck.problem}

## The Solution
${state.pitchDeck.solution}

## Value Propositions
${state.pitchDeck.valueProps.map(vp => `- ${vp}`).join('\\n')}

## Team
${state.team.map(t => `- **${t.name}** (${t.role}): ${t.bio}`).join('\\n')}

## Technical Architecture
**Agentic Swarms:** ${state.technicalArchitecture.agents}
**Contextual RAG:** ${state.technicalArchitecture.rag}
    `;
    
    const blob = new Blob([mdContent.trim()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "onu-ai-docs.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Zap className="w-8 h-8 text-indigo-500 animate-pulse" />
          <span className="text-slate-400 font-mono text-sm tracking-widest uppercase">Initializing Docs</span>
        </div>
      </div>
    );
  }

  // Locked View
  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-slate-950/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Restricted</h1>
          <p className="text-slate-400 mb-8">
            The documentation for onu.ai is currently private or outside of its scheduled public visibility window.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-white font-medium transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white print:bg-white print:text-black">
      {/* Glow effects - Hidden when printing */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none print:hidden" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none print:hidden" />

      {/* Header navbar */}
      <header className="border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors border border-slate-800/80">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                onu.ai
              </span>
              <span className="text-xs font-semibold text-indigo-400/90 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                /docs
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportMarkdown}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 transition-colors"
            >
              <FileText className="w-4 h-4" /> Markdown
            </button>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-sm font-medium text-indigo-300 transition-colors"
            >
              <Download className="w-4 h-4" /> PDF
            </button>
            <Link 
              href="/docs/admin" 
              className="ml-2 text-xs font-semibold text-slate-500 hover:text-white transition-colors underline underline-offset-4"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Navigation - Hidden when printing */}
        <aside className="lg:col-span-1 flex flex-col gap-2 print:hidden">
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/60 mb-4 backdrop-blur-sm">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technical Dossier</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Official developer whitepaper and architecture deck.
            </p>
          </div>

          {[
            { id: "pitch", icon: Sparkles, label: "01. Pitch Deck" },
            { id: "team", icon: Users, label: "02. Team Showcase" },
            { id: "architecture", icon: Layers, label: "03. Tech Architecture" },
            { id: "system", icon: Activity, label: "04. Live System View" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all border text-left ${
                activeTab === tab.id
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300 shadow-md shadow-indigo-500/5 font-semibold"
                  : "bg-slate-950/40 border-slate-900/60 text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-indigo-400" : ""}`} />
                <span>{tab.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </aside>

        {/* Right Content Area */}
        <section className="lg:col-span-3 bg-slate-950/30 rounded-2xl border border-slate-800/50 p-8 backdrop-blur-sm min-h-[600px] print:col-span-4 print:border-none print:bg-white print:p-0">
          
          {/* TAB 1: PITCH DECK */}
          <div className={`space-y-8 ${activeTab === "pitch" ? "block" : "hidden print:block"}`}>
            <div className="border-b border-slate-800/80 pb-4 print:border-slate-200">
                <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight flex items-center gap-2">
                  <Sparkles className="w-7 h-7 text-indigo-400 print:text-black" />
                  Product Pitch
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/10 space-y-3 print:bg-white print:border-slate-200 print:border">
                  <h3 className="font-semibold text-red-400 print:text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 print:bg-black" />
                    The Problem
                  </h3>
                  <p className="text-sm text-slate-400 print:text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {state?.pitchDeck.problem}
                  </p>
                </div>

                <div className="p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/10 space-y-3 print:bg-white print:border-slate-200 print:border">
                  <h3 className="font-semibold text-emerald-400 print:text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 print:bg-black" />
                    The Solution
                  </h3>
                  <p className="text-sm text-slate-400 print:text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {state?.pitchDeck.solution}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-6 rounded-xl border border-slate-800/60 space-y-4 print:bg-white print:border-slate-200 print:border">
                <h3 className="font-bold text-white print:text-black text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400 print:text-black" />
                  Core Value Propositions
                </h3>
                <ul className="space-y-4 text-sm text-slate-300 print:text-slate-800">
                  {state?.pitchDeck.valueProps.map((prop, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-indigo-400 print:text-black font-bold">0{idx + 1}.</span>
                      <span dangerouslySetInnerHTML={{ __html: prop.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          {/* TAB 2: TEAM */}
          <div className={`space-y-8 ${activeTab === "team" ? "block" : "hidden print:block print:mt-12"}`}>
            <div className="border-b border-slate-800/80 pb-4 print:border-slate-200">
                <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight flex items-center gap-2">
                  <Users className="w-7 h-7 text-indigo-400 print:text-black" />
                  Team Showcase
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state?.team.map((member, idx) => (
                  <div key={idx} className="p-6 bg-slate-900/50 rounded-xl border border-slate-800/60 print:bg-white print:border-slate-200 print:border">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 flex items-center justify-center text-white font-bold text-lg print:from-slate-200 print:to-slate-200 print:text-black">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold text-white print:text-black">{member.name}</h3>
                    <p className="text-sm font-semibold text-indigo-400 print:text-slate-500 mb-3">{member.role}</p>
                    <p className="text-sm text-slate-400 print:text-slate-700 leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

          {/* TAB 3: TECH ARCHITECTURE */}
          <div className={`space-y-8 ${activeTab === "architecture" ? "block" : "hidden print:block print:mt-12"}`}>
            <div className="border-b border-slate-800/80 pb-4 print:border-slate-200">
                <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight flex items-center gap-2">
                  <Layers className="w-7 h-7 text-indigo-400 print:text-black" />
                  Technical Architecture
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-950/80 rounded-xl border border-slate-800/60 print:bg-white print:border-slate-200 print:border">
                  <h3 className="font-bold text-white print:text-black flex items-center gap-2 mb-3">
                    <Network className="w-5 h-5 text-indigo-400 print:text-black" />
                    Agentic Swarms
                  </h3>
                  <p className="text-sm text-slate-400 print:text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {state?.technicalArchitecture.agents}
                  </p>
                </div>
                <div className="p-6 bg-slate-950/80 rounded-xl border border-slate-800/60 print:bg-white print:border-slate-200 print:border">
                  <h3 className="font-bold text-white print:text-black flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-indigo-400 print:text-black" />
                    Contextual RAG
                  </h3>
                  <p className="text-sm text-slate-400 print:text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {state?.technicalArchitecture.rag}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#090b14] rounded-xl border border-slate-800/80 print:hidden overflow-x-auto">
                <h3 className="font-bold text-slate-300 text-sm mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  System Data Flow
                </h3>
                {/* Mermaid Diagram */}
                <div className="mermaid flex justify-center text-sm">
{`graph TD
    A[User Client] -->|Uploads Guidelines & Video| B(Next.js Serverless Route)
    B --> C{Gemini 2.5 Flash}
    C -->|Extracts Text & Frames| D[Vector RAG Chunking]
    D -->|Scores Context| E(In-Memory Cache)
    E --> F[CMO Agent]
    E --> G[Creative Agent]
    E --> H[PR Agent]
    F --> I[Live Chat Stream]
    G --> I
    H --> I
    I -->|Server-Sent Events| A`}
                </div>
              </div>
            </div>

          {/* TAB 4: LIVE SYSTEM VIEW */}
          <div className={`space-y-8 ${activeTab === "system" ? "block" : "hidden print:block print:mt-12"}`}>
            <div className="border-b border-slate-800/80 pb-4 print:border-slate-200">
                <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight flex items-center gap-2">
                  <Activity className="w-7 h-7 text-emerald-400 print:text-black" />
                  Live System Telemetry
                </h1>
                <p className="text-slate-400 text-sm mt-1">Real-time metrics from the onu.ai serverless infrastructure.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-2">
                <div className="p-5 bg-slate-950/80 border border-slate-800/60 rounded-xl print:border-slate-200 print:bg-white">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Avg Latency</span>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">42ms</div>
                </div>
                <div className="p-5 bg-slate-950/80 border border-slate-800/60 rounded-xl print:border-slate-200 print:bg-white">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Active Agents</span>
                  <div className="text-2xl font-bold text-indigo-400 mt-1">3 nodes</div>
                </div>
                <div className="p-5 bg-slate-950/80 border border-slate-800/60 rounded-xl print:border-slate-200 print:bg-white">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Vercel Region</span>
                  <div className="text-2xl font-bold text-white mt-1 print:text-black">iad1</div>
                </div>
                <div className="p-5 bg-slate-950/80 border border-slate-800/60 rounded-xl print:border-slate-200 print:bg-white">
                  <span className="text-xs font-semibold text-slate-500 uppercase">DB Connection</span>
                  <div className="text-2xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Supabase
                  </div>
                </div>
              </div>

              <div className="h-48 bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 relative overflow-hidden print:hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-slate-400 text-sm">
                  <Server className="w-8 h-8 text-slate-600 mb-3" />
                  Live Event Stream Attached. Listening...
                </div>
              </div>
            </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#030712] py-8 text-center text-xs text-slate-600 print:hidden">
        <p>© 2026 onu.ai. Prepared for the AI Buildfest. 100% Legitimate & Custom Developed.</p>
      </footer>
    </div>
  );
}
