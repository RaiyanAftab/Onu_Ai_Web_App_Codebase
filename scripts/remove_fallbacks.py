import re

file_path = '/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/workspace/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Target block containing the fallback logic for optimization plans
target_fallback = """                {(reportData?.optimizationPlans || [
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
                ]).slice(0, 3).map((plan: any, idx: number) => {"""

replace_no_fallback = """                {(!reportData || !reportData.optimizationPlans || reportData.optimizationPlans.length === 0) ? (
                  <div className="col-span-1 md:col-span-3 p-12 text-center border border-white/5 bg-[#0A0A0A]">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest">Generating Real-Time Action Plans...</p>
                  </div>
                ) : (reportData.optimizationPlans).slice(0, 3).map((plan: any, idx: number) => {"""

if target_fallback in content:
    content = content.replace(target_fallback, replace_no_fallback)
    print("Replaced optimizationPlans fallback!")
else:
    print("Could not find optimizationPlans fallback!")

# Let's also make sure we remove fallbacks from the evidence Quotes
target_quotes_fallback = """              <div className="space-y-4">
                {(reportData?.evidenceQuotes || [
                  { personaName: "Rahim (25, Student, Dhaka)", personaColor: "bg-blue-500", quote: "Graphics are too heavy, hard to understand." },
                  { personaName: "Karim (35, Business, Ctg)", personaColor: "bg-orange-500", quote: "I like the offer, but the language is confusing." }
                ]).map((quote: any, idx: number) => ("""

replace_quotes_no_fallback = """              <div className="space-y-4">
                {(!reportData || !reportData.evidenceQuotes || reportData.evidenceQuotes.length === 0) ? (
                   <div className="p-4 border border-white/5 bg-black/20 text-center text-[9px] text-white/40 uppercase tracking-widest">Awaiting Swarm Quotes...</div>
                ) : reportData.evidenceQuotes.map((quote: any, idx: number) => ("""

if target_quotes_fallback in content:
    content = content.replace(target_quotes_fallback, replace_quotes_no_fallback)
    print("Replaced quotes fallback!")
else:
    print("Could not find quotes fallback!")


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done patching page.tsx fallbacks")
