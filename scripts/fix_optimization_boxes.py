import re

file_path = '/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/workspace/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target_action_plan = """            {/* COGNITIVE OPTIMIZATION & ACTION PLAN */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Option 1 */}
                <div className={`p-6 border transition-all duration-300 flex flex-col justify-between rounded-sm ${isDialectOptimized ? 'bg-[#051C0C] border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase">01 / Linguistic Dialect Shift</span>
                      <input 
                        type="checkbox"
                        checked={isDialectOptimized}
                        onChange={(e) => setIsDialectOptimized(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer rounded border-white/20 bg-black"
                      />
                    </div>
                    <h4 className="text-white text-xs font-bold tracking-wider mb-2 uppercase">Linguistic Dialect register</h4>
                    <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                      Shift script from standard Bengali to <strong>{targetGeography}</strong> dialect and localized metaphors:
                    </p>
                    <div className="mt-3 p-2 bg-black/40 border border-white/5 rounded-sm font-mono text-[9px] text-white/80">
                      "{multimodalData[targetGeography]?.adjustedDialogue || "ঈদের বিশেষ কালেকশন!"}"
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px]">
                    <span className="text-white/40">KPI IMPACT</span>
                    <span className="text-emerald-400 font-bold font-mono">-4% Friction | +6% ROAS</span>
                  </div>
                </div>

                {/* Option 2 */}
                <div className={`p-6 border transition-all duration-300 flex flex-col justify-between rounded-sm ${isFrictionOptimized ? 'bg-[#051C0C] border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase">02 / MFS Cashbacks</span>
                      <input 
                        type="checkbox"
                        checked={isFrictionOptimized}
                        onChange={(e) => setIsFrictionOptimized(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer rounded border-white/20 bg-black"
                      />
                    </div>
                    <h4 className="text-white text-xs font-bold tracking-wider mb-2 uppercase">Transactional overlay</h4>
                    <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                      Replace sterile discount hooks with localized <strong>bKash/Nagad</strong> cashless payment/cashback rewards:
                    </p>
                    <div className="mt-3 p-2 bg-black/40 border border-white/5 rounded-sm font-mono text-[9px] text-white/80">
                      "{multimodalData[targetGeography]?.adjustedOcr || "ক্যাশব্যাক নিশ্চিত!"}"
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px]">
                    <span className="text-white/40">KPI IMPACT</span>
                    <span className="text-emerald-400 font-bold font-mono">-6% Friction | +8% ROAS</span>
                  </div>
                </div>

                {/* Option 3 */}
                <div className={`p-6 border transition-all duration-300 flex flex-col justify-between rounded-sm ${isRadiusOptimized ? 'bg-[#051C0C] border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase">03 / Target Focus Lock</span>
                      <input 
                        type="checkbox"
                        checked={isRadiusOptimized}
                        onChange={(e) => setIsRadiusOptimized(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer rounded border-white/20 bg-black"
                      />
                    </div>
                    <h4 className="text-white text-xs font-bold tracking-wider mb-2 uppercase">Haversine focus lock</h4>
                    <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                      Restrict sweep to <strong>10 KM</strong> around primary regional node to prevent cohort signal dilution:
                    </p>
                    <div className="mt-3 p-2 bg-black/40 border border-white/5 rounded-sm font-sans text-[9px] text-white/80 leading-relaxed">
                      Hub: {hubCoordinates[targetGeography]?.name || "Local relays"}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px]">
                    <span className="text-white/40">KPI IMPACT</span>
                    <span className="text-emerald-400 font-bold font-mono">Restores Data Confidence to 93%</span>
                  </div>
                </div>
              </div>
            </div>"""

replace_action_plan = """            {/* COGNITIVE OPTIMIZATION & ACTION PLAN */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(reportData?.optimizationPlans || [
                  {
                    title: "Linguistic Dialect Shift",
                    description: `Shift script from standard Bengali to ${targetGeography} dialect and localized metaphors:`,
                    example: multimodalData[targetGeography]?.adjustedDialogue || "ঈদের বিশেষ কালেকশন!",
                    impact: "-4% Friction | +6% ROAS"
                  },
                  {
                    title: "MFS Cashbacks",
                    description: "Replace sterile discount hooks with localized bKash/Nagad cashless payment/cashback rewards:",
                    example: multimodalData[targetGeography]?.adjustedOcr || "ক্যাশব্যাক নিশ্চিত!",
                    impact: "-6% Friction | +8% ROAS"
                  },
                  {
                    title: "Target Focus Lock",
                    description: "Restrict sweep to 10 KM around primary regional node to prevent cohort signal dilution:",
                    example: `Hub: ${hubCoordinates[targetGeography]?.name || "Local relays"}`,
                    impact: "Restores Data Confidence to 93%"
                  }
                ]).slice(0, 3).map((plan: any, idx: number) => {
                  const stateCheck = idx === 0 ? isDialectOptimized : (idx === 1 ? isFrictionOptimized : isRadiusOptimized);
                  const setStateCheck = idx === 0 ? setIsDialectOptimized : (idx === 1 ? setIsFrictionOptimized : setIsRadiusOptimized);
                  
                  return (
                    <div key={idx} className={`p-6 border transition-all duration-300 flex flex-col justify-between rounded-sm ${stateCheck ? 'bg-[#051C0C] border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'}`}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase">0{idx + 1} / {plan.title}</span>
                          <input 
                            type="checkbox"
                            checked={stateCheck}
                            onChange={(e) => setStateCheck(e.target.checked)}
                            className="w-4 h-4 accent-emerald-500 cursor-pointer rounded border-white/20 bg-black"
                          />
                        </div>
                        <h4 className="text-white text-xs font-bold tracking-wider mb-2 uppercase">{plan.title}</h4>
                        <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                          {plan.description}
                        </p>
                        <div className="mt-3 p-2 bg-black/40 border border-white/5 rounded-sm font-sans normal-case text-[9px] text-white/80 leading-relaxed">
                          "{plan.example}"
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[9px]">
                        <span className="text-white/40">KPI IMPACT</span>
                        <span className="text-emerald-400 font-bold font-mono uppercase">{plan.impact}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>"""

if target_action_plan in content:
    content = content.replace(target_action_plan, replace_action_plan)
else:
    print("Could not find target_action_plan")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done patching optimization boxes")
