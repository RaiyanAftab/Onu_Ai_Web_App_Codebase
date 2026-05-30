"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DeveloperPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateApiKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Generate a realistic looking API key
      const randomChars = Array.from({length: 32}, () => Math.random().toString(36).charAt(2)).join('');
      setApiKey(`onu_live_${randomChars}`);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      alert('API Key copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#050505] text-[#D9D9D9] font-[family-name:var(--font-space)] min-h-screen">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050505]/90 backdrop-blur-md z-40">
        <div className="font-bold tracking-[0.3em] text-xl">
          <Link href="/">Onu.AI</Link>
        </div>
        <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase">
          <Link href="/workspace" className="hover:text-blue-400 transition-colors">WORKSPACE</Link>
          <Link href="/enterprise" className="hover:text-blue-400 transition-colors">ENTERPRISE</Link>
          <Link href="/developer" className="text-blue-500">DEVELOPER API</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-16">
          <div className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 text-[10px] tracking-widest font-bold mb-6">DEVELOPER PORTAL</div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-white mb-4">REST API ACCESS</h1>
          <p className="text-sm text-white/50 normal-case font-sans max-w-2xl">
            Integrate the Onu.AI 1,500 Consumer Profile engine directly into your own CMS, CRM, or marketing automation platforms. Bypass the dashboard and automate asset auditing at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* API Key Generation Box */}
          <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-widest text-white mb-2">AUTHENTICATION</h3>
              <p className="text-[10px] text-white/50 mb-8 normal-case font-sans">
                Generate a live production key to authenticate your requests via the Authorization header. Keep this key secret.
              </p>
            </div>

            <div className="space-y-4">
              {!apiKey ? (
                <button 
                  onClick={generateApiKey}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 text-[10px] font-bold tracking-[0.2em] transition-colors disabled:opacity-50"
                >
                  {isGenerating ? "PROVISIONING KEY..." : "GENERATE PRODUCTION KEY"}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-black border border-emerald-500/30 p-4 font-mono text-xs text-emerald-400 break-all">
                    {apiKey}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="w-full border border-white/20 hover:bg-white hover:text-black text-white py-4 text-[10px] font-bold tracking-[0.2em] transition-colors"
                  >
                    COPY TO CLIPBOARD
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Code Example Box */}
          <div className="bg-[#0A0A0A] border border-white/10 p-8">
             <h3 className="text-lg font-bold tracking-widest text-white mb-2">QUICKSTART (cURL)</h3>
             <p className="text-[10px] text-white/50 mb-6 normal-case font-sans">
                Send a POST request to our `/api/v1/analyze` endpoint to audit marketing copy against our simulated audience panel.
             </p>

             <div className="bg-black border border-white/5 p-6 rounded-sm overflow-x-auto">
<pre className="text-[10px] font-mono text-white/80 leading-relaxed">
<span className="text-blue-400">curl</span> -X POST https://onu-ai.vercel.app/api/v1/analyze \
  -H <span className="text-emerald-400">"Authorization: Bearer {apiKey || 'onu_live_YOUR_API_KEY'}"</span> \
  -H <span className="text-emerald-400">"Content-Type: application/json"</span> \
  -d <span className="text-yellow-400">'{'{'}
    "asset_text": "We are revolutionizing the digital landscape with synergy."
  {'}'}'</span>
</pre>
             </div>
          </div>
        </div>

        {/* JSON Response Example */}
        <div className="mt-12 bg-[#0A0A0A] border border-white/10 p-8">
           <h3 className="text-lg font-bold tracking-widest text-white mb-6">EXAMPLE RESPONSE</h3>
           <div className="bg-black border border-white/5 p-6 rounded-sm overflow-x-auto">
<pre className="text-[10px] font-mono text-white/70 leading-relaxed">
{`{
  "status": "success",
  "metadata": {
    "api_version": "v1",
    "model": "onu-cognitive-swarm-1500",
    "latency_ms": 812
  },
  "analysis": {
    "writing_quality_score": 87,
    "audience_disconnect_risk": "LOW",
    "regional_reach_score": 92,
    "detected_cultural_blind_spots": [
      "Tone may be perceived as overly aggressive in rural demographics.",
      "Missing localization nuances for GenZ subsets in urban centers."
    ],
    "optimized_copy_suggestion": "Rewrite the second sentence to use softer language..."
  }
}`}
</pre>
           </div>
        </div>

      </main>
    </div>
  );
}
