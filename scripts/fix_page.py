import re

with open('src/app/workspace/page.tsx', 'r', encoding='latin-1') as f:
    content = f.read()

# We need to find `const handleRegenerateKey = () => {`
start_marker = "const handleRegenerateKey = () => {"
end_marker = "const PreSimulationUI = () => ("

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers")
    exit(1)

correct_code = """const handleRegenerateKey = () => {
    const chars = '0123456789abcdef';
    let result = 'onu_live_';
    for (let i = 0; i < 24; i++) {
      result += chars[Math.floor(Math.random() * 16)];
    }
    setApiKey(result);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startSimulation = async () => {
    setAppMode('simulating');
    setProgress(0);
    setActiveNodeCount(0);
    
    // Simulate complex orchestration
    const tasks = [
      "ALLOCATING COMPUTE NODES...",
      "SPINNING UP HOSTILE PERSONAS...",
      isFreeTier ? "SKIPPING RAG BASELINE (FREE TIER)..." : "INGESTING BRANDBOOK HISTORICAL RAG...",
      "EXECUTING HAVERSINE DECAY MATRIX...",
      "ANALYZING SEMANTIC FRICTION...",
      "COMPILING DEMOGRAPHIC REPORT..."
    ];
    
    let currentTaskIndex = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95; // Hold at 95% until API responds
        }
        
        // Update task text based on progress
        if (prev > (currentTaskIndex * 20) && currentTaskIndex < tasks.length - 1) {
          currentTaskIndex++;
          setCurrentTask(tasks[currentTaskIndex]);
        }
        
        setActiveNodeCount(Math.floor((prev / 100) * (isFreeTier ? 30 : 1500)));
        return prev + 1.5;
      });
    }, 100);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedFileBase64,
          campaignPrompt: objectivePrompt,
          isFreeTier: isFreeTier
        }),
      });
      const data = await response.json();
      setReportData(data);
    } catch (e) {
      console.error(e);
    }

    clearInterval(interval);
    setProgress(100);
    setTimeout(() => {
      setAppMode(isFreeTier ? 'free_results' : 'enterprise_report');
    }, 500);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userPrompt = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userPrompt }]);
    setChatInput('');
    
    try {
      setChatMessages(prev => [...prev, { role: 'system', sender: 'ONU.AI SWARM AGGREGATOR', text: 'Analyzing...' }]);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedFileBase64,
          chatHistory: chatMessages,
          userMessage: userPrompt,
          targetGeography,
          campaignPrompt: objectivePrompt
        }),
      });
      
      const data = await response.json();
      
      setChatMessages(prev => prev.slice(0, -1));
      
      if (data.error) {
         setChatMessages(prev => [...prev, { role: 'system', sender: 'ONU.AI SWARM AGGREGATOR', text: 'Error connecting to swarm.' }]);
         return;
      }
      
      setChatMessages(prev => [...prev, { 
        role: 'system', 
        sender: 'ONU.AI SWARM AGGREGATOR', 
        avatarColor: 'bg-indigo-500', 
        text: `[SWARM SUMMARY]\n${data.summary}` 
      }]);
      
      if (data.evidence && data.evidence.length > 0) {
        data.evidence.forEach((ev: any, i: number) => {
           setTimeout(() => {
             setChatMessages(prev => [...prev, {
               role: 'system',
               sender: ev.personaName,
               avatarColor: ev.personaColor || 'bg-emerald-500',
               text: ev.quote
             }]);
           }, (i + 1) * 800);
        });
        
        setTimeout(() => {
           setChatMessages(prev => [...prev, {
             role: 'system',
             sender: 'ONU.AI ACTION PLAN',
             avatarColor: 'bg-blue-500',
             text: data.feedback
           }]);
        }, (data.evidence.length + 1) * 800);
      } else {
        setTimeout(() => {
           setChatMessages(prev => [...prev, {
             role: 'system',
             sender: 'ONU.AI ACTION PLAN',
             avatarColor: 'bg-blue-500',
             text: data.feedback
           }]);
        }, 800);
      }
      
    } catch (e) {
      setChatMessages(prev => prev.slice(0, -1));
      setChatMessages(prev => [...prev, { role: 'system', sender: 'ONU.AI', text: 'An error occurred during swarm aggregation.' }]);
    }
  };

  // --------------------------------------------------------------------------------
  // UI COMPONENTS
  // --------------------------------------------------------------------------------

  const PreSimulationUI = () => ("""

new_content = content[:start_idx] + correct_code + content[end_idx + len(end_marker):]

with open('src/app/workspace/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed!")
