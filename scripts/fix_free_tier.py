import re

file_path = '/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/workspace/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Node Calculation
target_node = "setActiveNodeCount(Math.floor((prev / 100) * (isFreeTier ? 30 : 1500)));"
replace_node = "setActiveNodeCount(Math.floor((prev / 100) * 1500));"

if target_node in content:
    content = content.replace(target_node, replace_node)
else:
    print("Could not find target_node")

# 2. Fix Free Tier Results UI
target_free_ui = """            {appMode === 'free_results' && (
              <motion.div key="free_results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                 {/* Basic Free UI (keeping it simple as requested previously) */}
                 <div className="bg-[#0A0A0A] border border-white/10 p-12 text-center max-w-2xl">
                    <h2 className="text-3xl text-white font-light mb-4">DIAGNOSTIC COMPLETE</h2>
                    <p className="text-xs text-white/50 normal-case font-sans mb-8">Basic friction points detected. Upgrade to the Brand Vault for full RAG Historical Analysis, deep metric feedback, and Executive Chat consultation.</p>
                    <Link href='/pricing' className="bg-white text-black px-8 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-colors">
                      UPGRADE TO BRAND VAULT
                    </Link>
                 </div>
              </motion.div>
            )}"""

replace_free_ui = """            {appMode === 'free_results' && (
              <motion.div key="free_results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center overflow-y-auto p-6 bg-[#020202]">
                 <div className="bg-[#0A0A0A] border border-white/10 p-12 max-w-2xl w-full flex flex-col items-center">
                    <h2 className="text-3xl text-white font-light mb-6 text-center tracking-tighter">DIAGNOSTIC COMPLETE</h2>
                    
                    {reportData?.actionableFeedback && reportData.actionableFeedback.length > 0 && (
                      <div className="w-full mb-8 text-left border border-white/10 bg-[#050505] p-8 rounded-sm">
                        <div className="text-emerald-400 font-bold text-[9px] tracking-widest mb-4 flex items-center gap-2 uppercase">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                           FREE TIER INSIGHT
                        </div>
                        <p className="text-[11px] text-white/80 font-sans normal-case leading-relaxed">
                          {reportData.actionableFeedback[0]}
                        </p>
                      </div>
                    )}
                    
                    <p className="text-[10px] text-white/40 normal-case font-sans mb-8 text-center max-w-md leading-relaxed">
                      This is a limited snapshot. Upgrade to the Brand Vault for full RAG Historical Analysis, deep metric feedback (ROAS, Friction, Confidence), and Executive Chat consultation with 1,500 simulated personas.
                    </p>
                    <Link href='/pricing' className="bg-emerald-500 text-black px-8 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-colors w-full text-center">
                      UNLOCK FULL REPORT
                    </Link>
                 </div>
              </motion.div>
            )}"""

if target_free_ui in content:
    content = content.replace(target_free_ui, replace_free_ui)
else:
    print("Could not find target_free_ui")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done patching page.tsx")
