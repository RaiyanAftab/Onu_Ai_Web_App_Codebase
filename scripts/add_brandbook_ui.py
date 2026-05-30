with open('src/app/workspace/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_textarea = """<p className="text-[9px] text-white/40 mt-2 font-sans normal-case">Providing context allows the Swarm to deliver catered, actionable execution feedback in the final report.</p>
            </div>"""

new_textarea = """<p className="text-[9px] text-white/40 mt-2 font-sans normal-case">Providing context allows the Swarm to deliver catered, actionable execution feedback in the final report.</p>
            </div>
            
            <div className="w-full bg-[#111] border border-white/10 p-6 mt-4">
               <label className="block text-[10px] text-blue-500 font-bold tracking-widest mb-3 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                 THE BRAND VAULT (MEMORY & GUIDELINES)
               </label>
               <textarea 
                 value={brandBook}
                 onChange={(e) => {
                    setBrandBook(e.target.value);
                    localStorage.setItem('brandBook', e.target.value);
                 }}
                 placeholder="Paste your brand guidelines, past successes/failures, or tone-of-voice context here. This acts as a strict memory vault to minimize token waste."
                 className="w-full bg-black border border-white/20 p-4 text-white text-xs font-sans normal-case focus:border-blue-500 outline-none resize-y h-32"
               />
               <p className="text-[9px] text-white/40 mt-2 font-sans normal-case">The neural model accesses this vault for every analysis, guaranteeing precise alignment without repeatedly uploading large PDFs.</p>
            </div>"""

content = content.replace(old_textarea, new_textarea)

# also add localStorage loading
use_effect_load = """useEffect(() => {
    if (tierParam === 'free') {
      setIsFreeTier(true);
    }
  }, [tierParam]);"""

use_effect_new = """useEffect(() => {
    if (tierParam === 'free') {
      setIsFreeTier(true);
    }
    const savedBrandBook = localStorage.getItem('brandBook');
    if (savedBrandBook) {
      setBrandBook(savedBrandBook);
    }
  }, [tierParam]);"""
  
content = content.replace(use_effect_load, use_effect_new)

with open('src/app/workspace/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added brand vault UI")
