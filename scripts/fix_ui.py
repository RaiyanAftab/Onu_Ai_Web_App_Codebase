import re

file_path = '/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/workspace/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the entire MULTIMODAL HARMONIZATION ENGINE block
start_marker1 = "{/* NEW SECTION: Multimodal AI Perception Grid */}"
end_marker1 = "{/* 9-Point Diagnostic Deep Dive */}"

if start_marker1 in content and end_marker1 in content:
    start_idx = content.find(start_marker1)
    end_idx = content.find(end_marker1)
    
    dynamic_multimodal = """{/* NEW SECTION: Multimodal AI Perception Grid */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-light text-white tracking-tighter">MULTIMODAL PERCEPTION ENGINE: AUDIO & VISUAL PARSING</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <p className="text-xs text-white/60 font-sans normal-case mb-8 leading-relaxed">
              Our neural engine runs real-time acoustic transcription, visual OCR scanning, and caption tone alignment tailored to the telecom region. It translates generic promotional phrasing into high-converting regional dialogue.
            </p>

            {(!reportData || !reportData.multimodalHarmonization) ? (
              <div className="p-12 text-center border border-white/5 bg-[#0A0A0A]">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Generating Multimodal Harmonization Data...</p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Audio/Dialogue */}
              <div className="bg-[#0A0A0A] border border-emerald-500/20 p-6 flex flex-col justify-between rounded-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-50"></div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      01 / AUDIO DIALOGUE OPTIMIZER
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-white/5 p-3 bg-black/60 rounded-sm">
                      <span className="block text-[8px] text-white/40 tracking-wider mb-1">RAW DIALOGUE DETECTED</span>
                      <p className="text-[10px] text-red-400 font-mono italic leading-relaxed">
                        "{reportData.multimodalHarmonization.dialogue?.raw || 'N/A'}"
                      </p>
                    </div>
                    <div className="border border-emerald-500/20 p-3 bg-emerald-950/20 rounded-sm">
                      <span className="block text-[8px] text-emerald-400/60 tracking-wider mb-1">HIGH-RESONANCE DIALECT SHIFT</span>
                      <p className="text-[11px] text-white font-bold leading-relaxed">
                        "{reportData.multimodalHarmonization.dialogue?.adjusted || 'N/A'}"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-white/50 font-sans normal-case leading-relaxed">
                  <strong className="text-white block mb-1">RATIONALE:</strong>
                  {reportData.multimodalHarmonization.dialogue?.rationale || 'N/A'}
                </div>
              </div>

              {/* Card 2: Visual OCR Banner */}
              <div className="bg-[#0A0A0A] border border-blue-500/20 p-6 flex flex-col justify-between rounded-sm relative overflow-hidden group hover:border-blue-500/40 transition-all">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 opacity-50"></div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] text-blue-400 font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                      02 / VISUAL OCR BANNER SCAN
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-white/5 p-3 bg-black/60 rounded-sm">
                      <span className="block text-[8px] text-white/40 tracking-wider mb-1">STATIC OVERLAY SCAN</span>
                      <p className="text-[10px] text-white/30 font-mono line-through uppercase">
                        {reportData.multimodalHarmonization.ocr?.raw || 'N/A'}
                      </p>
                    </div>
                    <div className="border border-blue-500/20 p-3 bg-blue-950/20 rounded-sm">
                      <span className="block text-[8px] text-blue-400/60 tracking-wider mb-1">LOCALIZED TRIGGER</span>
                      <p className="text-[10px] text-white font-bold font-sans normal-case leading-relaxed">
                        {reportData.multimodalHarmonization.ocr?.adjusted || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-white/50 font-sans normal-case leading-relaxed">
                  <strong className="text-white block mb-1">RATIONALE:</strong>
                  {reportData.multimodalHarmonization.ocr?.rationale || 'N/A'}
                </div>
              </div>

              {/* Card 3: Social Caption Tuner */}
              <div className="bg-[#0A0A0A] border border-indigo-500/20 p-6 flex flex-col justify-between rounded-sm relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 opacity-50"></div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] text-indigo-400 font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                      03 / POST CAPTION ADAPTATION
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-white/5 p-3 bg-black/60 rounded-sm">
                      <span className="block text-[8px] text-white/40 tracking-wider mb-1">ORIGINAL GENERIC COPY</span>
                      <p className="text-[9px] text-white/35 font-sans normal-case truncate">
                        "{reportData.multimodalHarmonization.caption?.raw || 'N/A'}"
                      </p>
                    </div>
                    <div className="border border-indigo-500/20 p-3 bg-indigo-950/20 rounded-sm">
                      <span className="block text-[8px] text-indigo-400/60 tracking-wider mb-1">OPTIMIZED CAPTION</span>
                      <p className="text-[9px] text-white font-medium font-sans normal-case leading-relaxed line-clamp-3">
                        {reportData.multimodalHarmonization.caption?.adjusted || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-white/50 font-sans normal-case leading-relaxed">
                  <strong className="text-white block mb-1">RATIONALE:</strong>
                  {reportData.multimodalHarmonization.caption?.rationale || 'N/A'}
                </div>
              </div>
            </div>
            )}
          </div>

          """
    content = content[:start_idx] + dynamic_multimodal + content[end_idx:]
    print("Replaced multimodal block!")


# 2. Replace the 9-POINT COGNITIVE DIAGNOSTIC block
start_marker2 = "{/* 9-Point Diagnostic Deep Dive */}"
end_marker2 = "{/* NEW SECTION: SWARM DEMOGRAPHIC COHORT DEEP-DIVE */}"

if start_marker2 in content and end_marker2 in content:
    start_idx = content.find(start_marker2)
    end_idx = content.find(end_marker2)
    
    dynamic_diagnostic = """{/* 9-Point Diagnostic Deep Dive */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-light text-white tracking-tighter">9-POINT COGNITIVE DIAGNOSTIC</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {(!reportData || !reportData.ninePointDiagnostic || reportData.ninePointDiagnostic.length === 0) ? (
              <div className="p-12 text-center border border-white/5 bg-[#0A0A0A]">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Generating 9-Point Data...</p>
              </div>
            ) : (
            <div className="space-y-12">
              {['SURVIVAL LAYER', 'DEMOGRAPHIC LAYER', 'PERFORMANCE LAYER'].map((layerName, layerIdx) => {
                const metrics = reportData.ninePointDiagnostic.filter((m: any) => m.layer === layerName);
                if (metrics.length === 0) return null;
                const colorCode = layerIdx === 0 ? 'red' : (layerIdx === 1 ? 'emerald' : 'blue');
                
                return (
                  <div key={layerName}>
                    <div className={`text-${colorCode}-500 text-[10px] font-bold tracking-[0.2em] mb-4 uppercase`}>[ LAYER 0{layerIdx + 1} : {layerName} ]</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {metrics.map((metric: any, idx: number) => {
                         const metricColor = metric.color || colorCode;
                         return (
                          <div key={idx} className={`bg-[#0A0A0A] border border-${metricColor}-500/10 p-6 flex flex-col justify-between min-h-[180px] relative overflow-hidden group hover:border-${metricColor}-500/30 transition-all`}>
                            <div>
                              <div className="text-[9px] text-white/40 tracking-wider mb-2">{metric.metricName}</div>
                              <div className={`text-3xl font-light text-${metricColor}-500 mb-4 font-mono`}>{metric.value} <span className="text-[10px] text-white/40">{metric.label}</span></div>
                              <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                                {metric.description}
                              </p>
                            </div>
                            <div className="w-full h-1 bg-white/5 mt-4 overflow-hidden">
                               <div className={`h-full bg-${metricColor}-500 transition-all duration-1000`} style={{ width: metric.value.replace(/[^0-9]/g, '') + '%' }} />
                            </div>
                          </div>
                         )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            )}
          </div>

          """
    content = content[:start_idx] + dynamic_diagnostic + content[end_idx:]
    print("Replaced 9-point block!")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done patching UI")
