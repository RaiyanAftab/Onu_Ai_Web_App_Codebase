import sys

def replace_lines(filepath, start_line, end_line, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    # Python is 0-indexed, start_line is 1-indexed
    before = lines[:start_line - 1]
    after = lines[end_line:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(before)
        f.write(new_content)
        if not new_content.endswith('\n'):
            f.write('\n')
        f.writelines(after)

new_code = """  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userPrompt = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userPrompt }]);
    setChatInput('');
    
    // Add loading indicator
    setChatMessages(prev => [...prev, { 
      role: 'system', 
      sender: 'ONU.AI NEURAL ENGINE', 
      avatarColor: 'bg-indigo-500', 
      text: 'Analyzing campaign with Persona Neural Engine...' 
    }]);

    try {
      const res = await fetch('/api/personas/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetGeography: targetGeography,
          targetAgeGroup: targetAge,
          targetIncomeGroup: targetIncome,
          campaignText: userPrompt,
          campaignOcr: userPrompt
        })
      });
      
      const data = await res.json();
      
      if (data.success && data.swarm) {
        // Remove loading indicator
        setChatMessages(prev => prev.filter(msg => msg.text !== 'Analyzing campaign with Persona Neural Engine...'));
        
        // Push the new responses with staggering effect
        data.swarm.forEach((response, index) => {
          setTimeout(() => {
            setChatMessages(prev => [...prev, {
              role: 'system',
              sender: `${response.name} (${response.neighborhood})`,
              avatarColor: index % 2 === 0 ? 'bg-emerald-500' : 'bg-blue-500',
              text: response.response
            }]);
          }, index * 800);
        });
        
      } else {
        throw new Error(data.error || "Failed to fetch");
      }
    } catch (err) {
      setChatMessages(prev => prev.filter(msg => msg.text !== 'Analyzing campaign with Persona Neural Engine...'));
      setChatMessages(prev => [...prev, {
        role: 'system',
        sender: 'ONU.AI ERROR',
        avatarColor: 'bg-red-500',
        text: 'Error generating response: ' + (err.message || 'Unknown error')
      }]);
    }
  };
"""

replace_lines('/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/workspace/page.tsx', 483, 652, new_code)
print("Replaced handleChatSubmit")
