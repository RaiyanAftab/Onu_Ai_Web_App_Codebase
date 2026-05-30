"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EnterprisePage() {
  const router = useRouter();

  return (
    <div className="bg-[#050505] text-[#D9D9D9] font-[family-name:var(--font-space)] uppercase text-xs tracking-wider selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* Background Noise & Grid */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>

      {/* Global Navigation Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050505]/90 backdrop-blur-md z-40 relative">
        <div className="flex items-center gap-8">
          <Link href='/' className="font-bold text-white tracking-[0.2em] border border-white/20 px-3 py-1 bg-white/5 hover:bg-white hover:text-black transition-colors">
            Onu.AI
          </Link>
        </div>
        <div className="flex gap-6 items-center text-[10px] font-bold tracking-widest text-white/50">
          <Link href='/workspace' className="hover:text-white transition-colors">WORKSPACE</Link>
          <button className="text-white border-b-2 border-white pb-1">ENTERPRISE</button>
          <Link href='/pricing' className="hover:text-white transition-colors">PRICING</Link>
           <Link href="/developer" className="hover:text-blue-400 transition-colors">DEVELOPER API</Link>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* SECTION 1: THE HERO */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative border-b border-white/10 overflow-hidden">
          {/* Abstract Data Stream Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
               className="w-[1000px] h-[1000px] border border-emerald-500/10 rounded-full"
             />
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
               className="absolute w-[800px] h-[800px] border border-emerald-500/20 rounded-full border-dashed"
             />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-emerald-500 text-[10px] font-bold tracking-[0.3em] mb-6 flex items-center justify-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              CLEARANCE LEVEL: 4 (BRAND VAULT)
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-medium tracking-tighter text-white leading-[0.85] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              THE BRAND<br/>VAULT.
            </h1>
            <p className="text-sm md:text-base text-white/50 normal-case font-sans max-w-2xl mx-auto leading-relaxed">
              An isolated, high-compute testing engine reserved for top-tier agencies and enterprise marketing teams. The Brand Vault unlocks the full, unredacted power of the 1,500-profile AI Audience Panel.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href='/workspace'
                className="bg-emerald-500 text-black px-8 py-4 font-bold tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                ENTER BRAND VAULT
              </Link>
              <button 
                onClick={() => {
                  const element = document.getElementById('clearance-form');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white/20 text-white px-8 py-4 font-bold tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all"
              >
                REQUEST PROVISIONING
              </button>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: THE 9-POINT COGNITIVE DIAGNOSTIC */}
        <section className="py-32 px-6 border-b border-white/10 bg-[#020202]">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-24">
              <div className="inline-block border border-white/20 px-4 py-1 text-[10px] tracking-[0.3em] font-bold text-white mb-6 bg-[#0A0A0A]">
                UNRESTRICTED ACCESS
              </div>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white">THE 9-POINT DIAGNOSTIC</h2>
              <p className="text-sm text-white/50 normal-case font-sans max-w-xl mx-auto mt-6">
                While the Free tier exposes basic friction, the Brand Vault grants full visibility into all 3 operational layers of your campaign's cognitive impact.
              </p>
            </div>

            {/* LAYER 1: THE SURVIVAL LAYER */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32"
            >
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="text-red-500 text-[10px] font-bold tracking-widest mb-4">LAYER_01</div>
                <h3 className="text-4xl font-light tracking-tighter text-white mb-6">THE SURVIVAL<br/>LAYER</h3>
                <p className="text-xs text-white/50 normal-case font-sans leading-relaxed">
                  Identifies critical blockers that will kill your campaign before it even starts. We analyze socio-political risk, immediate viewer drop-off, and UX friction in your call-to-action.
                </p>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { title: "REPUTATION RISK INDEX", desc: "Probability of socio-political boycotts based on cultural blind spots.", color: "border-red-500/30 bg-red-500/5", glow: "shadow-[0_0_15px_rgba(239,68,68,0.2)]" },
                   { title: "VIRAL HOOK RETENTION", desc: "Projected viewer drop-off trajectory within the critical first 3 seconds.", color: "border-amber-500/30 bg-amber-500/5", glow: "" },
                   { title: "CTA FRICTION SCORE", desc: "Psychological resistance between consuming the asset and executing the desired action.", color: "border-orange-500/30 bg-orange-500/5", glow: "" }
                 ].map((metric, i) => (
                   <div key={i} className={`p-8 border ${metric.color} ${metric.glow} flex flex-col justify-between min-h-[250px] relative overflow-hidden group`}>
                      <div className="z-10">
                        <h4 className="text-xs font-bold text-white mb-4 tracking-widest">{metric.title}</h4>
                        <p className="text-[10px] text-white/60 normal-case font-sans">{metric.desc}</p>
                      </div>
                      {/* Abstract Visual */}
                      <div className="absolute bottom-[-10%] right-[-10%] opacity-20 group-hover:opacity-40 transition-opacity">
                         <div className="w-32 h-32 border border-current rounded-full flex items-center justify-center">
                            <div className="w-16 h-16 border border-current rounded-full"></div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>

            {/* LAYER 2: THE DEMOGRAPHIC LAYER */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32"
            >
              <div className="lg:col-span-8 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { title: "DEMOGRAPHIC AUTHENTICITY", desc: "Measures alignment of slang, attire, and visual cues with the specific target cohort.", color: "border-emerald-500/30 bg-emerald-500/5" },
                   { title: "CULTURAL COMPLIANCE", desc: "Tracks alignment with local societal norms, religious events, and regional dialects.", color: "border-emerald-500/30 bg-emerald-500/5" },
                   { title: "GENERATIONAL RESONANCE", desc: "Determines if humor, pacing, and core messaging effectively translates to the target age group.", color: "border-emerald-500/30 bg-emerald-500/5" }
                 ].map((metric, i) => (
                   <div key={i} className={`p-8 border ${metric.color} flex flex-col justify-between min-h-[250px] relative overflow-hidden group`}>
                      <div className="z-10">
                        <h4 className="text-xs font-bold text-white mb-4 tracking-widest">{metric.title}</h4>
                        <p className="text-[10px] text-white/60 normal-case font-sans">{metric.desc}</p>
                      </div>
                      {/* Abstract Crosshair Visual */}
                      <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                         <div className="relative w-16 h-16 flex items-center justify-center">
                            <div className="absolute w-full h-px bg-emerald-500"></div>
                            <div className="absolute h-full w-px bg-emerald-500"></div>
                            <div className="absolute w-8 h-8 border border-emerald-500 rounded-full"></div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col justify-center lg:text-right">
                <div className="text-emerald-500 text-[10px] font-bold tracking-widest mb-4">LAYER_02</div>
                <h3 className="text-4xl font-light tracking-tighter text-white mb-6">THE DEMOGRAPHIC<br/>LAYER</h3>
                <p className="text-xs text-white/50 normal-case font-sans leading-relaxed">
                  Confirms that your asset actually speaks to the people you are paying to reach. The swarm analyzes hyper-local dialects, cultural nuances, and generational shifts in real-time.
                </p>
              </div>
            </motion.div>

            {/* LAYER 3: THE PERFORMANCE LAYER */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="text-blue-500 text-[10px] font-bold tracking-widest mb-4">LAYER_03</div>
                <h3 className="text-4xl font-light tracking-tighter text-white mb-6">THE PERFORMANCE<br/>LAYER</h3>
                <p className="text-xs text-white/50 normal-case font-sans leading-relaxed">
                  Projects the actual commercial outcome. We measure semantic persuasiveness, brand recall longevity, and cross-reference against your proprietary historical baseline.
                </p>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { title: "SEMANTIC QUALITY", desc: "Evaluates the tone, grammar, and emotional pacing of the copywriting for persuasive impact.", color: "border-blue-500/30 bg-blue-500/5" },
                   { title: "INFORMATION RETENTION", desc: "Projects the percentage of the Swarm capable of recalling the core value proposition 24 hours post-exposure.", color: "border-blue-500/30 bg-blue-500/5" },
                   { title: "HISTORICAL ROI BASELINE", desc: "Calculates projected Projected return on ad spend by ingesting and comparing against your past campaign PDFs.", color: "border-indigo-500/30 bg-indigo-500/5" }
                 ].map((metric, i) => (
                   <div key={i} className={`p-8 border ${metric.color} flex flex-col justify-between min-h-[250px] relative overflow-hidden group`}>
                      <div className="z-10">
                        <h4 className="text-xs font-bold text-white mb-4 tracking-widest">{metric.title}</h4>
                        <p className="text-[10px] text-white/60 normal-case font-sans">{metric.desc}</p>
                      </div>
                      {/* Abstract Chart Visual */}
                      <div className="absolute bottom-0 right-0 w-full h-1/2 flex items-end gap-1 px-4 opacity-10 group-hover:opacity-30 transition-opacity">
                         <motion.div initial={{ height: "20%" }} whileInView={{ height: "40%" }} className="w-1/4 bg-current"></motion.div>
                         <motion.div initial={{ height: "30%" }} whileInView={{ height: "60%" }} className="w-1/4 bg-current"></motion.div>
                         <motion.div initial={{ height: "40%" }} whileInView={{ height: "80%" }} className="w-1/4 bg-current"></motion.div>
                         <motion.div initial={{ height: "50%" }} whileInView={{ height: "100%" }} className="w-1/4 bg-current"></motion.div>
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 3: THE DEEP TECH MODULES */}
        <section className="py-32 px-6 border-b border-white/10 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white mb-6">VAULT EXCLUSIVE ARCHITECTURE</h2>
              <p className="text-sm text-white/50 normal-case font-sans max-w-2xl mx-auto">
                Beyond the 9-Point Diagnostic, the Brand Vault grants access to three enterprise-grade modules designed to protect and scale global brands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0A0A0A] border border-white/5 p-8 group hover:border-emerald-500/50 transition-colors relative overflow-hidden">
                 <div className="text-emerald-500 mb-6 text-4xl font-light">01</div>
                 <h3 className="text-lg font-bold text-white mb-4 z-10 relative">PUBLIC REACTION TEST</h3>
                 <p className="text-xs text-white/50 normal-case font-sans leading-relaxed z-10 relative">
                   We partition the AI audience panel into adversarial entities. Before a campaign goes live, the swarm stress-tests your asset against socio-political sensitivities, exposing latent reputational risks and audience disconnect risks.
                 </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.2 }} className="bg-[#0A0A0A] border border-white/5 p-8 group hover:border-emerald-500/50 transition-colors relative overflow-hidden">
                 <div className="text-emerald-500 mb-6 text-4xl font-light">02</div>
                 <h3 className="text-lg font-bold text-white mb-4 z-10 relative">REGIONAL REACH SCORE MAPPING</h3>
                 <p className="text-xs text-white/50 normal-case font-sans leading-relaxed z-10 relative">
                   Access the live OpenStreetMap geocoder. We use Haversine distance calculations from Major internet centres to accurately decay Data Confidence based on real-world ISP latency and rural abstraction logic.
                 </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.4 }} className="bg-[#0A0A0A] border border-white/5 p-8 group hover:border-emerald-500/50 transition-colors relative overflow-hidden">
                 <div className="text-emerald-500 mb-6 text-4xl font-light">03</div>
                 <h3 className="text-lg font-bold text-white mb-4 z-10 relative">CAMPAIGN PERFORMANCE LIBRARY</h3>
                 <p className="text-xs text-white/50 normal-case font-sans leading-relaxed z-10 relative">
                   Securely upload up to 5 years of your past campaign performance data. The swarm ingests this to establish a Proprietary Baseline, scoring your new asset against your own company's specific historical data.
                 </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE LEAD GEN FORM (CTA) */}
        <section id="clearance-form" className="py-32 px-6 bg-[#020202]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-[#0A0A0A] border border-white/10 p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white/10 px-3 py-1 text-[8px] tracking-widest">PROVISIONING SERVER: STANDBY</div>
              <h3 className="text-4xl font-light tracking-tighter text-white mb-4 text-center">REQUEST VAULT CLEARANCE</h3>
              <p className="text-xs text-white/40 mb-12 normal-case font-sans text-center max-w-md mx-auto">
                Due to the heavy compute requirements of the Brand Vault, we manually provision servers for enterprise clients. Submit your details to request access to the ৳25,000/month tier.
              </p>
              
              <form className="space-y-8">
                <div>
                  <label className="block text-[10px] text-white/50 mb-2">AGENCY / BRAND NAME</label>
                  <input type="text" className="w-full bg-black border border-white/20 p-4 text-white focus:border-emerald-500 outline-none transition-colors text-[10px]" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50 mb-2">CORPORATE EMAIL ADDRESS</label>
                  <input type="email" className="w-full bg-black border border-white/20 p-4 text-white focus:border-emerald-500 outline-none transition-colors text-[10px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] text-white/50 mb-2">AVG MONTHLY SPEND</label>
                    <select className="w-full bg-black border border-white/20 p-4 text-white focus:border-emerald-500 outline-none transition-colors text-[10px] appearance-none cursor-pointer">
                      <option>&lt; ৳1 Crore</option>
                      <option>৳1 - ৳5 Crore</option>
                      <option>&gt; ৳5 Crore</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/50 mb-2">INITIAL NODE ALLOCATION</label>
                    <select className="w-full bg-black border border-white/20 p-4 text-white focus:border-emerald-500 outline-none transition-colors text-[10px] appearance-none cursor-pointer">
                      <option>250 Test-Credits (Base Vault)</option>
                      <option>1000+ Test-Credits (Custom API)</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="w-full bg-white text-black py-6 font-bold tracking-[0.3em] text-[10px] mt-8 hover:bg-emerald-500 hover:text-white transition-colors">
                  SUBMIT CLEARANCE REQUEST
                </button>
              </form>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
