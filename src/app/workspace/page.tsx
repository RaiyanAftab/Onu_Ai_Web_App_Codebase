"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const hubCoordinates: Record<string, { name: string; lat: number; lng: number; signal: string }> = {
  "Urban Dhaka Metro": { name: "Dhaka Central Hub (Motijheel Central)", lat: 23.7291, lng: 90.4137, signal: "98% (EXCELLENT)" },
  "Narayanganj Commerce Hub": { name: "Chashara Industrial Cluster (Narayanganj Relays)", lat: 23.6238, lng: 90.5000, signal: "95% (EXCELLENT)" },
  "Industrial Gazipur Belt": { name: "Gazipur Industrial Grid (Joydebpur Chowrasta Hub)", lat: 23.9999, lng: 90.4203, signal: "96% (EXCELLENT)" },
  "Semi-Urban Chittagong Port": { name: "Chittagong Port Terminal (Agrabad Hub)", lat: 22.3244, lng: 91.8122, signal: "94% (STRONG)" },
  "Rural / Agrarian Sylhet Hub": { name: "Sylhet Tea Estate Relays (Zindabazar Tower)", lat: 24.8949, lng: 91.8687, signal: "81% (STABLE)" },
  "Northern Bogura Distribution Node": { name: "Bogura Retail Cluster (Shaatmatha Hub)", lat: 24.8510, lng: 89.3697, signal: "85% (STABLE)" }
};

const multimodalData: Record<string, {
  rawDialogue: string;
  adjustedDialogue: string;
  dialogueRationale: string;
  rawCaption: string;
  adjustedCaption: string;
  captionRationale: string;
  ocrTarget: string;
  adjustedOcr: string;
  ocrRationale: string;
}> = {
  "Urban Dhaka Metro": {
    rawDialogue: "সবচেয়ে কম দামে সেরা পোশাক কিনুন!",
    adjustedDialogue: "অভিজাত আভিজাত্য আর ঐতিহ্যের মেলবন্ধন—অনুর সাথে সাজুন এই ঈদে।",
    dialogueRationale: "Targets premium elite Gulshan/Motijheel styling with luxury heritage signals.",
    rawCaption: "Check out our new arrivals! Best prices in town.",
    adjustedCaption: "ঐতিহ্যের আভিজাত্যে মোড়ানো আমাদের নতুন ঈদ কালেকশন এখন লাইভ। ঢাকা মেট্রোর ওনু গ্যালারিতে আমন্ত্রণ। 🌙 #PremiumEid #DhakaHeritage",
    captionRationale: "Refines social copy with premium luxury lifestyle markers and a dedicated gallery callout.",
    ocrTarget: "50% DISCOUNT!",
    adjustedOcr: "প্রথম অর্ডারে নিশ্চিত ৫০% ক্যাশব্যাক!",
    ocrRationale: "Integrates motivating fintech cashback incentives representing corporate purchasing convenience."
  },
  "Narayanganj Commerce Hub": {
    rawDialogue: "ঈদ কালেকশন দেখতে চলে আসুন!",
    adjustedDialogue: "চাষাড়ার ঐতিহ্যবাহী সুতোয় বোনা আধুনিক ডিজাইন—আপনার উৎসব হোক অনন্য।",
    dialogueRationale: "Connects with Chashara's wholesale textile hub heritage.",
    rawCaption: "Special offers inside Narayanganj. Don't miss out!",
    adjustedCaption: "চাষাড়া মোড়ের ঐতিহ্যবাহী কারিগরদের বোনা সুতি আর সিল্কের এক অপূর্ব সমন্বয়। আপনার পরিবারের জন্য সেরা উৎসবের উপহারটি বেছে নিন ওনু চাষাড়া আউটলেট থেকে। 🌸 #ChasharaPride #LocalAesthetic",
    captionRationale: "Injects hyper-local landmark pride (Chashara Crossing) and references authentic artisan weavers.",
    ocrTarget: "CHEAP SALE ONLY",
    adjustedOcr: "চাষাড়া আউটলেটে bKash পেমেন্টে ইনস্ট্যান্ট ক্যাশব্যাক!",
    ocrRationale: "Swaps sterile discount labels with local mobile financial service (MFS) triggers."
  },
  "Industrial Gazipur Belt": {
    rawDialogue: "সস্তা দরে ভালো জামা নিন",
    adjustedDialogue: "জয়দেবপুরের পোশাক কারিগরদের দক্ষ হাতের নিপুণ ছোঁয়া—সাধ্যের মধ্যে সেরা গুণমান।",
    dialogueRationale: "Resonates with Joydebpur factory workers, emphasizing skilled craftsmanship.",
    rawCaption: "Buy budget clothing online now.",
    adjustedCaption: "জয়দেবপুর চৌরাস্তা মোড়ে ওনু সেন্টারে চলছে বিশেষ উৎসব অফার। কঠোর পরিশ্রমে দক্ষ হাতে বোনা প্রিমিয়াম পোশাক এখন আপনার বাজেটের ভেতরেই! 🧵 #GazipurCrafts #JoydebpurCentral",
    captionRationale: "Positions target value around fair pricing, physical proximity to Joydebpur Crossroads, and labor pride.",
    ocrTarget: "BIG DISCOUNT ADVERT",
    adjustedOcr: "উৎসবের কেনাকাটায় নিশ্চিত ক্যাশব্যাক ও জিরো-কস্ট ডেলিভারি!",
    ocrRationale: "Minimizes buyer friction with concrete delivery cost exemptions and instant financial recovery tags."
  },
  "Northern Bogura Distribution Node": {
    rawDialogue: "উত্তরবঙ্গের সেরা শোরুম",
    adjustedDialogue: "সাতমাথার হৃদস্পন্দন ছুঁয়ে যাক আপনার উৎসবের আমেজ—আমাদের উত্তরবঙ্গ বিশেষ কালেকশনে।",
    dialogueRationale: "Leverages Shaatmatha's central northern gateway pride.",
    rawCaption: "Get the best north-bengal clothing items.",
    adjustedCaption: "বগুড়ার ঐতিহাসিক সাতমাথা মোড়ের ঠিক কেন্দ্রস্থলে ওনু শোরুমে এখন নতুন উৎসবের আমেজ। উত্তরবঙ্গের সেরা সুতোর বিন্যাসে সাজুন এই উৎসবে। 🌾 #ShaatmathaClassic #NorthBengalFocus",
    captionRationale: "Anchors campaign credibility directly at Shaatmatha Hub and celebrates northern heritage.",
    ocrTarget: "BOGURA STORE DISCOUNT",
    adjustedOcr: "সাতমাথা মোড় শোরুমে নিশ্চিত bKash মার্চেন্ট ক্যাশব্যাক!",
    ocrRationale: "Applies high-performing merchant bKash cashback labels, verified to drive local conversion metrics."
  },
  "Semi-Urban Chittagong Port": {
    rawDialogue: "কম দামে ভালো অফার নিন",
    adjustedDialogue: "পোর্ট সিটির ঐতিহ্য আর আভিজাত্যে ঘেরা আমাদের বিশেষ কালেকশন—আজই সংগ্রহ করুন।",
    dialogueRationale: "Captures Agrabad commercial and port authority local pride.",
    rawCaption: "Buy clothes now in Chittagong outlets.",
    adjustedCaption: "চট্টগ্রাম পোর্ট সিটির ঐতিহ্যবাহী বাণিজ্যিক স্পন্দনে অনুর আভিজাত্য। অগ্রাবাদ গোলপাহাড় শোরুমে এসে অনুভব করুন সেরা ফেব্রিকের কোমলতা। ⚓ #PortCityPremium #AgrabadHub",
    captionRationale: "Captures commercial sea pride, specifically highlighting the Agrabad showroom for business crowds.",
    ocrTarget: "50% CLEARANCE SALE",
    adjustedOcr: "অগ্রাবাদ শোরুমে পেমেন্টে নিশ্চিত উৎসব ক্যাশব্যাক অফার!",
    ocrRationale: "Replaces high-volume clearance jargon with localized commercial rewards suitable for port professionals."
  },
  "Rural / Agrarian Sylhet Hub": {
    rawDialogue: "নতুন জামা চলে এসেছে",
    adjustedDialogue: "প্রবাসীদের পছন্দের আভিজাত্যে বোনা—জিন্দাবাজারের ওনু প্রিমিয়াম কালেকশন।",
    dialogueRationale: "Leverages high remittance/Zindabazar purchasing behaviors.",
    rawCaption: "Check out Sylhet showroom new collection.",
    adjustedCaption: "লন্ডনী প্রবাসীদের পছন্দের আভিজাত্য আর সিলেটের ঐতিহ্যের এক অপূর্ব মেলবন্ধন। জিন্দাবাজারের এক্সক্লুসিভ ওনু লাউঞ্জে আপনার আমন্ত্রণ। 🇬🇧✈️ #SylhetHeritage #ZindabazarElite",
    captionRationale: "Leverages remittance purchasing power and prestige associated with the Zindabazar Elite lounge.",
    ocrTarget: "CHEAP EID DRESSES",
    adjustedOcr: "লন্ডনী প্রবাসীদের জন্য জিন্দাবাজারে ওনু এক্সক্লুসিভ লাউঞ্জ!",
    ocrRationale: "Reframes simple discount banners into executive luxury lounge status vectors."
  }
};

function WorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFreeTier = searchParams.get('tier') === 'free';
  
  const [activeTab, setActiveTab] = useState('workspace');
  const [appMode, setAppMode] = useState<'upload' | 'simulating' | 'free_results' | 'enterprise_report'>('upload');
  
  // Simulation State
  const [progress, setProgress] = useState(0);
  const [activeNodeCount, setActiveNodeCount] = useState(0);
  const [currentTask, setCurrentTask] = useState('INITIALIZING SWARM...');
  
  // Radius State
  const [radiusKm, setRadiusKm] = useState(10);
  
  // Target Demographic parameters
  const [targetAge, setTargetAge] = useState('Select All (Any Age)');
  const [targetIncome, setTargetIncome] = useState('Select All (Any Income)');
  const [targetGeography, setTargetGeography] = useState('Urban Dhaka Metro');
  
  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [calculatedNodes, setCalculatedNodes] = useState<number | null>(null);
  const [isCalculatingNodes, setIsCalculatingNodes] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'system', sender?: string, avatarColor?: string, text: string}[]>([
    { role: 'system', text: 'Onu.AI Core online. Awaiting executive queries regarding the generated diagnostic.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Optimization States
  const [isDialectOptimized, setIsDialectOptimized] = useState(false);
  const [isFrictionOptimized, setIsFrictionOptimized] = useState(false);
  const [isRadiusOptimized, setIsRadiusOptimized] = useState(false);

  // Context State
  const [objectivePrompt, setObjectivePrompt] = useState('');

  // API Tab State
  const [apiKey, setApiKey] = useState('onu_live_b7c2d89e9f1a2b3c4d5e6f7a');
  const [reportData, setReportData] = useState<any>(null);
  const [brandBook, setBrandBook] = useState('');
  const [isBrandVaultOpen, setIsBrandVaultOpen] = useState(false);
  const [pastCampaignText, setPastCampaignText] = useState('');
  const [brandFiles, setBrandFiles] = useState<File[]>([]);
  const [pastCampaignFiles, setPastCampaignFiles] = useState<File[]>([]);
  const [mockBrandFiles, setMockBrandFiles] = useState<{name: string, size: number, type: string}[]>([]);
  const [mockPastCampaignFiles, setMockPastCampaignFiles] = useState<{name: string, size: number, type: string}[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync state on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBrandBook = localStorage.getItem('brandBook');
      if (savedBrandBook) setBrandBook(savedBrandBook);
      const savedPastCampaignText = localStorage.getItem('pastCampaignText');
      if (savedPastCampaignText) setPastCampaignText(savedPastCampaignText);
      const savedBrandFileNames = localStorage.getItem('brandFileNames');
      if (savedBrandFileNames) setMockBrandFiles(JSON.parse(savedBrandFileNames));
      const savedPastCampaignFileNames = localStorage.getItem('pastCampaignFileNames');
      if (savedPastCampaignFileNames) setMockPastCampaignFiles(JSON.parse(savedPastCampaignFileNames));
    }
  }, []);

  const processUploadedFile = (file: File) => {
    setUploadedFile(file);
    setIsCalculatingNodes(true);
    
    if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration || 15;
        const nodes = Math.max(5, Math.ceil(duration / 15) * 5);
        setTimeout(() => {
          setCalculatedNodes(nodes);
          setIsCalculatingNodes(false);
        }, 1500);
      };
      video.src = URL.createObjectURL(file);
    } else if (file.type.startsWith('image/')) {
      setTimeout(() => {
        setCalculatedNodes(1.0);
        setIsCalculatingNodes(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setCalculatedNodes(0.5);
        setIsCalculatingNodes(false);
      }, 1500);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const getBrandVaultContext = () => {
    return `
[BRAND IDENTITY GUIDELINES]:
${brandBook || 'No explicit guidelines provided.'}

[PAST CAMPAIGNS CASE STUDY & CONTEXT]:
${pastCampaignText || 'No past campaign context provided.'}

[INGESTED BRAND IDENTITY FILES]:
${mockBrandFiles.map(f => `- ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)`).join('\n') || 'None'}

[INGESTED PAST CAMPAIGN FILES]:
${mockPastCampaignFiles.map(f => `- ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)`).join('\n') || 'None'}
    `.trim();
  };
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'curl' | 'python' | 'javascript'>('curl');

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
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

  const startSimulation = async () => {
    if (!uploadedFile) return;
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
          return 95;
        }
        
        if (prev > (currentTaskIndex * 20) && currentTaskIndex < tasks.length - 1) {
          currentTaskIndex++;
          setCurrentTask(tasks[currentTaskIndex]);
        }
        
        setActiveNodeCount(Math.floor((prev / 100) * 1500));
        return prev + 1.5;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('campaignPrompt', objectivePrompt);
      formData.append('isFreeTier', String(isFreeTier));
      formData.append('brandBook', getBrandVaultContext());

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setReportData(data);
    } catch (e) {
      console.error(e);
    }

    clearInterval(interval);
    setProgress(100);
    setTimeout(() => {
      setAppMode('enterprise_report');
    }, 500);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !uploadedFile) return;
    
    const userPrompt = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userPrompt }]);
    setChatInput('');
    
    try {
      setChatMessages(prev => [...prev, { role: 'system', sender: 'ONU.AI SWARM AGGREGATOR', text: 'Analyzing...' }]);
      
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('chatHistory', JSON.stringify(chatMessages));
      formData.append('userMessage', userPrompt);
      formData.append('targetGeography', targetGeography);
      formData.append('campaignPrompt', objectivePrompt);
      formData.append('brandBook', getBrandVaultContext());
      formData.append('isFreeTier', String(isFreeTier));

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setChatMessages(prev => prev.slice(0, -1)); // remove "Analyzing..."
      
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

  const PreSimulationUI = () => (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10 flex flex-col items-center min-h-[calc(100vh-80px)] scrollbar-thin">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-12 md:mt-0">
        
        {/* Left Col: Upload & Context */}
        <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
          {/* INITIALIZE AI AUDIENCE PANEL BUTTON (TOP LEFT FOR OPTIMAL ACCESSIBILITY) */}
          <button 
            type="button"
            disabled={!uploadedFile || isCalculatingNodes}
            onClick={startSimulation}
            className={`w-full py-4 text-[10px] font-bold tracking-[0.25em] transition-all border rounded-sm flex items-center justify-center gap-2 group cursor-pointer ${
              !uploadedFile 
                ? 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed' 
                : isFreeTier 
                  ? 'bg-white text-black border-white hover:bg-blue-500 hover:text-white hover:border-blue-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-emerald-500 text-black border-emerald-500 hover:bg-white hover:text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {uploadedFile ? (
              <>
                {isCalculatingNodes ? (
                  <svg className="animate-spin h-3 w-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
                {isCalculatingNodes 
                  ? 'CALCULATING NODE ALLOCATION...' 
                  : `INITIALIZE AI AUDIENCE PANEL (COST: ${calculatedNodes !== null ? calculatedNodes : 0} NODES) ⚡`
                }
              </>
            ) : (
              'AWAITING CAMPAIGN ASSET UPLOAD 🔒'
            )}
          </button>
          <div 
            className={`w-full aspect-video border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/20 bg-black/50'} rounded-lg flex flex-col items-center justify-center p-8 transition-all relative overflow-hidden`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
               <div className="text-center z-10">
                 <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/50">
                    <span className="text-blue-500 text-3xl">✓</span>
                 </div>
                 <p className="text-white font-bold tracking-widest text-sm mb-2">{uploadedFile.name}</p>
                 <p className="text-white/50 text-[10px] mb-6">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • READY FOR INGESTION</p>
                 <button onClick={() => setUploadedFile(null)} className="text-[10px] text-red-500 hover:text-red-400 underline tracking-widest">REMOVE ASSET</button>
               </div>
            ) : (
               <div className="text-center z-10">
                 <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                 </div>
                 <p className="text-white/50 text-xs mb-2">Drag and drop campaign asset</p>
                 <p className="text-white/30 text-[10px] tracking-widest mb-6">SUPPORTED: MP4, WEBM, MOV, JPG, PNG, PDF</p>
                 
                 <label className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-sm text-[10px] font-bold tracking-widest cursor-pointer transition-colors border border-white/10">
                   BROWSE FILES
                   <input type="file" className="hidden" onChange={handleFileChange} />
                 </label>
               </div>
            )}
          </div>

          {/* Contextual Prompt Input (Enterprise Only) */}
          {!isFreeTier && (
            <div className="space-y-4">
              <div className="w-full bg-[#111] border border-white/10 p-6">
                 <label className="block text-[10px] text-emerald-500 font-bold tracking-widest mb-3 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   CAMPAIGN OBJECTIVE (OPTIONAL)
                 </label>
                 <textarea 
                   value={objectivePrompt}
                   onChange={(e) => setObjectivePrompt(e.target.value)}
                   placeholder="e.g. 'We are targeting Gen-Z in Dhaka while trying to maintain our premium heritage established in the Eid 2024 campaign...'"
                   className="w-full bg-black border border-white/20 p-4 text-white text-xs font-sans normal-case focus:border-emerald-500 outline-none resize-none h-24"
                 />
                 <p className="text-[9px] text-white/40 mt-2 font-sans normal-case">Providing context allows the Swarm to deliver catered, actionable execution feedback in the final report.</p>
              </div>
              

            </div>
          )}
        </div>

        {/* Right Col: Configuration */}
        <div className="col-span-12 md:col-span-4 bg-black/80 backdrop-blur-md border border-white/10 p-6 relative flex flex-col justify-between">
          <div>
            {/* BRAND BOOK & VAULT TRIGGER BUTTON */}
            {!isFreeTier ? (
              <button 
                type="button"
                onClick={() => setIsBrandVaultOpen(true)}
                className="w-full mb-6 py-3.5 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 hover:from-blue-600/35 hover:to-emerald-600/35 text-white border border-blue-500/30 hover:border-emerald-500/50 rounded-sm text-[10px] font-bold tracking-[0.25em] transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                BRAND BOOK & VAULT ⚡
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => router.push('/pricing')}
                className="w-full mb-6 py-3 bg-white/5 hover:bg-white/10 text-white/40 border border-white/10 rounded-sm text-[10px] font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>🔒</span> BRAND BOOK & VAULT (VAULT TIER)
              </button>
            )}

            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h2 className="text-sm font-bold tracking-widest text-white">ORCHESTRATION<br/>PARAMETERS</h2>
              <div className="text-[8px] bg-white/10 px-2 py-1 text-white/70 tracking-widest">
                {isFreeTier ? 'DIAGNOSTIC TIER' : 'BRAND VAULT TIER'}
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <label className="block text-[10px] text-white/50 mb-2">ASSET ARCHITECTURE</label>
                <select className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none text-[10px] appearance-none cursor-pointer">
                  <option className="bg-black" disabled={isFreeTier}>
                    OMNICHANNEL (TVC + OVC) {isFreeTier && '🔒'}
                  </option>
                  <option className="bg-black" disabled={isFreeTier}>
                    BROADCAST TVC ONLY {isFreeTier && '🔒'}
                  </option>
                  <option className="bg-black">
                    {isFreeTier ? 'DIGITAL OVC (MAX 15 SEC)' : 'DIGITAL OVC ONLY'}
                  </option>
                  <option className="bg-black">STATIC VISUAL ASSET</option>
                </select>
                {isFreeTier && <div className="text-[9px] text-red-500 mt-2 font-sans normal-case">Long-form simulation requires Enterprise compute allocation.</div>}
              </div>

              {/* Target Age Group */}
              <div className="relative group">
                <label className="block text-[10px] text-white/50 mb-2 flex justify-between">
                  <span>TARGET AGE GROUP</span>
                </label>
                <select 
                  value={targetAge} 
                  onChange={(e) => setTargetAge(e.target.value)} 
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none text-[10px] appearance-none cursor-pointer"
                >
                  <option className="bg-black text-white" value="Select All (Any Age)">Select All (Any Age)</option>
                  <option className="bg-black text-white" value="Gen-Z (18-25)">Gen-Z (18-25)</option>
                  <option className="bg-black text-white" value="Millennials (26-40)">Millennials (26-40)</option>
                  <option className="bg-black text-white" value="Gen-X (41-55)">Gen-X (41-55)</option>
                  <option className="bg-black text-white" value="Boomers (56+)">Boomers (56+)</option>
                </select>
              </div>

              {/* Target Income Cohort */}
              <div className="relative group">
                <label className="block text-[10px] text-white/50 mb-2 flex justify-between">
                  <span>TARGET INCOME COHORT</span>
                </label>
                <select 
                  value={targetIncome} 
                  onChange={(e) => setTargetIncome(e.target.value)} 
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none text-[10px] appearance-none cursor-pointer"
                >
                  <option className="bg-black text-white" value="Select All (Any Income)">Select All (Any Income)</option>
                  <option className="bg-black text-white" value="Lower Income / Working Class">Lower Income / Working Class</option>
                  <option className="bg-black text-white" value="Lower-Middle Income">Lower-Middle Income</option>
                  <option className="bg-black text-white" value="Upper-Middle Income">Upper-Middle Income</option>
                  <option className="bg-black text-white" value="Premium / HNI">Premium / HNI</option>
                  <option className="bg-black text-white" value="Ultra-HNI / Elite">Ultra-HNI / Elite</option>
                </select>
              </div>

              {/* Cultural Geography */}
              <div className="relative group">
                <label className="block text-[10px] text-white/50 mb-2 flex justify-between">
                  <span>CULTURAL GEOGRAPHY</span>
                  {isFreeTier && <span className="text-red-500 text-[8px]">🔒 VAULT TIER</span>}
                </label>
                <select 
                  value={targetGeography} 
                  onChange={(e) => setTargetGeography(e.target.value)} 
                  disabled={isFreeTier}
                  className={`w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none text-[10px] appearance-none cursor-pointer ${isFreeTier ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option className="bg-black text-white" value="Urban Dhaka Metro">Urban Dhaka Metro</option>
                  <option className="bg-black text-white" value="Narayanganj Commerce Hub">Narayanganj Commerce Hub</option>
                  <option className="bg-black text-white" value="Industrial Gazipur Belt">Industrial Gazipur Belt</option>
                  <option className="bg-black text-white" value="Semi-Urban Chittagong Port">Semi-Urban Chittagong Port</option>
                  <option className="bg-black text-white" value="Rural / Agrarian Sylhet Hub">Rural / Agrarian Sylhet Hub</option>
                  <option className="bg-black text-white" value="Northern Bogura Distribution Node">Northern Bogura Distribution Node</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-white/50 mb-2 flex justify-between">
                  <span>HAVERSINE TARGET RADIUS</span>
                  {isFreeTier && <span className="text-red-500">🔒 LOCKED</span>}
                </label>
                
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={isFreeTier ? 100 : radiusKm}
                  disabled={isFreeTier}
                  onChange={(e) => setRadiusKm(parseInt(e.target.value))}
                  className={`w-full h-1 bg-white/20 appearance-none outline-none ${isFreeTier ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                />
                
                <div className="flex justify-between mt-2 text-[10px]">
                  <span className="text-white/40">1km (Hyper-Local)</span>
                  <span className="text-blue-400 font-bold">{isFreeTier ? 'NATIONAL' : `${radiusKm} KM`}</span>
                  <span className="text-white/40">100km (National)</span>
                </div>

                {/* Geolocation Hub Pin HUD */}
                <div className="mt-4 p-3 bg-black/60 border border-white/10 rounded-sm relative overflow-hidden backdrop-blur-md">
                  {/* Blinking indicator */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] text-emerald-400 font-mono tracking-widest">LIVE LINK</span>
                  </div>

                  <div className="text-[8px] text-white/40 tracking-wider mb-2 uppercase">TELECOM CELL GROUNDING</div>
                  <div className="font-mono text-[9px] text-white space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/50">NODE HUB:</span>
                      <span className="text-blue-400 font-bold truncate max-w-[160px]" title={hubCoordinates[targetGeography]?.name || hubCoordinates["Urban Dhaka Metro"].name}>
                        {hubCoordinates[targetGeography]?.name || hubCoordinates["Urban Dhaka Metro"].name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">COORDINATES:</span>
                      <span className="text-emerald-400 font-bold tracking-widest">
                        {(hubCoordinates[targetGeography] || hubCoordinates["Urban Dhaka Metro"]).lat.toFixed(4)}° N, {(hubCoordinates[targetGeography] || hubCoordinates["Urban Dhaka Metro"]).lng.toFixed(4)}° E
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">SIGNAL INTENSITY:</span>
                      <span className="text-white font-bold">
                        {isFreeTier ? "12% (DILUTED BASELINE)" : (() => {
                          const baseSignal = (hubCoordinates[targetGeography] || hubCoordinates["Urban Dhaka Metro"]).signal;
                          const baseNum = parseInt(baseSignal) || 95;
                          const dynamicNum = Math.max(12, Math.round(baseNum - (radiusKm * 0.82)));
                          let status = "EXCELLENT";
                          if (dynamicNum < 25) status = "DILUTED (BASELINE ONLY)";
                          else if (dynamicNum < 55) status = "MODERATE (REGIONAL NOISE)";
                          else if (dynamicNum < 80) status = "STRONG";
                          return `${dynamicNum}% (${status})`;
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">HAVERSINE SCAN:</span>
                      <span className="text-indigo-400 font-bold">
                        {isFreeTier ? "N/A (LOCKED)" : `r = ${radiusKm} KM (±${(radiusKm * 0.03).toFixed(2)}km decay)`}
                      </span>
                    </div>
                  </div>
                </div>

                {isFreeTier && (
                  <p className="text-[9px] text-red-500 mt-3 font-sans normal-case border border-red-500/20 p-2 bg-red-500/5">
                    Radius Map logic requires Enterprise Tier. Defaulting to National abstract data.
                  </p>
                )}
                <p className="text-[9px] text-white/40 mt-3 font-sans normal-case border border-white/10 p-2 leading-relaxed">
                  <strong className="text-emerald-400 font-bold block mb-1">BUSINESS ROI VALUE & SCAN ACCURACY:</strong>
                  Narrowing the radius simulates precise local transactions and hyper-local dialect nuances close to the telecom hub. This eliminates ad waste by testing local buyer reactions (ideal for localized retail, regional billboard zones, or neighborhood geo-targeted digital ads). Increasing the radius extends the scan nationally, but dilutes precision due to demographically diverse consumer populations, decaying overall confidence.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
             <button 
               onClick={startSimulation}
               disabled={!uploadedFile}
               className="bg-white text-black px-8 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
               INITIALIZE SWARM
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SimulationUI = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[10px] text-blue-400 tracking-[0.3em] font-bold mb-1">NODE SWARM ACTIVE</div>
            <div className="text-3xl text-white font-light tracking-tighter">{Math.floor(progress)}%</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/40 tracking-widest mb-1">ACTIVE NODES</div>
            <div className="text-xl text-white font-mono">{activeNodeCount.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="w-full h-1 bg-white/10 mb-6 overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="bg-black/50 border border-white/10 p-4 font-mono text-[10px] text-white/60 flex items-center gap-3">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          {currentTask}
        </div>
      </div>
    </div>
  );

  // The fully expanded, massive Enterprise Report
  const EnterpriseReport = () => {
    const currentRadius = isRadiusOptimized ? 10 : radiusKm;
    const displayConfidence = reportData?.dataConfidence || Math.max(52, Math.round(98 - (currentRadius * 0.46)));
    const displayFriction = reportData?.overallFriction || Math.max(4, 14 - (isDialectOptimized ? 4 : 0) - (isFrictionOptimized ? 6 : 0));
    const displayRoas = reportData?.roasPotential || 12 + (isDialectOptimized ? 6 : 0) + (isFrictionOptimized ? 8 : 0);

    return (
      <div className="flex-1 flex h-[calc(100vh-80px)] overflow-hidden relative z-10 bg-[#020202]">
        
        {/* LEFT COLUMN: THE MASSIVE REPORT */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-16 scrollbar-hide">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="border-b border-white/10 pb-8 mb-12 flex justify-between items-end">
              <div>
                <div className="text-emerald-500 text-[10px] font-bold tracking-[0.3em] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  BRAND VAULT: CLEARANCE LEVEL 4
                </div>
                <h1 className="text-4xl lg:text-6xl font-light tracking-tighter text-white">EXECUTIVE DIRECTIVE.</h1>
              </div>
              <div className="text-right hidden sm:block">
                 <button onClick={() => window.print()} className="border border-white/20 px-4 py-2 text-[10px] tracking-widest text-white hover:bg-white hover:text-black transition-colors print:hidden">
                   EXPORT PDF TO BOARD
                 </button>
              </div>
            </div>

            {reportData?.error && (
              <div className="mb-12 p-6 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm rounded">
                <strong className="block mb-2">API ERROR:</strong>
                {reportData.error}
              </div>
            )}

            {/* Overall Confidence */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Confidence Card */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col items-center justify-center relative group">
                 {/* Tooltip */}
                 <div className="absolute top-3 right-3 group/tooltip z-20">
                   <button className="text-white/30 hover:text-white transition-colors p-1" type="button">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </button>
                   <div className="absolute top-7 -right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-56 sm:w-64 p-4 bg-black/95 border border-white/20 text-[10px] text-white/70 font-sans normal-case leading-relaxed text-left rounded shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none backdrop-blur-md z-50">
                     <div className="font-bold text-white mb-1 uppercase tracking-wider text-[9px] text-emerald-400">DATA CONFIDENCE</div>
                     Measures simulated response accuracy based on physical distance decay from primary ISP hubs. Lower radii minimize boundary dilution, raising confidence.
                   </div>
                 </div>
                 
                 <div className="text-[10px] text-white/50 tracking-widest mb-4 z-10">DATA CONFIDENCE (HAVERSINE)</div>
                 <div className="text-6xl font-light text-emerald-400 z-10">{displayConfidence}<span className="text-3xl">%</span></div>
                 <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Friction Card */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col items-center justify-center relative group">
                 {/* Tooltip */}
                 <div className="absolute top-3 right-3 group/tooltip z-20">
                   <button className="text-white/30 hover:text-white transition-colors p-1" type="button">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </button>
                   <div className="absolute top-7 -right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-56 sm:w-64 p-4 bg-black/95 border border-white/20 text-[10px] text-white/70 font-sans normal-case leading-relaxed text-left rounded shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none backdrop-blur-md z-50">
                     <div className="font-bold text-white mb-1 uppercase tracking-wider text-[9px] text-red-400">OVERALL FRICTION</div>
                     Predicts viewer drop-off, socio-political risks, and CTA resistance. Friction is reduced by optimizing language alignment and transactional triggers.
                   </div>
                 </div>

                 <div className="text-[10px] text-white/50 tracking-widest mb-4 z-10">OVERALL FRICTION</div>
                 <div className="text-6xl font-light text-red-400 z-10">{displayFriction}<span className="text-3xl">%</span></div>
                 <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* ROAS Lift Card */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col items-center justify-center relative group">
                 {/* Tooltip */}
                 <div className="absolute top-3 right-3 group/tooltip z-20">
                   <button className="text-white/30 hover:text-white transition-colors p-1" type="button">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </button>
                   <div className="absolute top-7 -right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-56 sm:w-64 p-4 bg-black/95 border border-white/20 text-[10px] text-white/70 font-sans normal-case leading-relaxed text-left rounded shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none backdrop-blur-md z-50">
                     <div className="font-bold text-white mb-1 uppercase tracking-wider text-[9px] text-blue-400">PROJECTED ROAS LIFT</div>
                     Estimates return on investment optimization based on adherence to historically successful vector embeddings and brand guidelines.
                   </div>
                 </div>

                 <div className="text-[10px] text-white/50 tracking-widest mb-4 z-10">PROJECTED ROAS LIFT</div>
                 <div className="text-6xl font-light text-blue-400 z-10">+{displayRoas}<span className="text-3xl">%</span></div>
                 <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* COGNITIVE OPTIMIZATION & ACTION PLAN */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(!reportData || (!reportData.optimizationPlans && !reportData.error) || (reportData.optimizationPlans && reportData.optimizationPlans.length === 0)) ? (
                  <div className="col-span-1 md:col-span-3 p-12 text-center border border-white/5 bg-[#0A0A0A]">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest">Generating Real-Time Action Plans...</p>
                  </div>
                ) : reportData.error ? (
                  <div className="col-span-1 md:col-span-3 p-12 text-center border border-red-500/20 bg-red-500/5 text-red-400 text-xs">
                    Failed to generate optimization plans.
                  </div>
                ) : (reportData.optimizationPlans).slice(0, 3).map((plan: any, idx: number) => {
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
            </div>

            {/* INTERACTIVE SWARM CHAT CALLOUT BANNER */}
            <div className="bg-[#0A0A0A] border border-blue-500/20 p-6 rounded-sm relative overflow-hidden mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-blue-500/30 transition-all">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 opacity-40"></div>
              <div>
                <span className="text-[9px] text-blue-400 font-bold tracking-[0.2em] uppercase flex items-center gap-1.5 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  Swarm Consultation Active
                </span>
                <h4 className="text-white text-sm font-bold tracking-wider mb-1">CONVERSE WITH THE CULTURAL SWARM</h4>
                <p className="text-[10px] text-white/50 font-sans normal-case leading-relaxed max-w-xl">
                  Need custom taglines, scripts, or hooks? Use the <strong>Executive Consultation</strong> sidebar to chat with the 1,500 active consumer profiles of <strong>{targetGeography}</strong> in real-time.
                </p>
              </div>
              <button 
                onClick={() => {
                  const chatInputEl = document.querySelector('input[placeholder*="Ask the 1,500"]') as HTMLInputElement;
                  if (chatInputEl) {
                    chatInputEl.focus();
                    chatInputEl.classList.add('ring-2', 'ring-blue-500/40');
                    setTimeout(() => chatInputEl.classList.remove('ring-2', 'ring-blue-500/40'), 1500);
                  }
                }}
                className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white border border-blue-400/20 px-4 py-2.5 text-[9px] font-bold tracking-[0.2em] transition-all duration-300"
              >
                OPEN CONSULTATION CHAT 💬
              </button>
            </div>

          {/* NEW SECTION: Historical RAG Analysis */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-light text-white tracking-tighter">HISTORICAL BRAND ADHERENCE (RAG)</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            
            <div className="bg-[#111] border border-white/10 p-8">
               <p className="text-xs text-white/60 font-sans normal-case mb-8 leading-relaxed">
                 The AI Audience Panel has cross-referenced the newly uploaded asset against 4.2GB of your secure historical campaign data (Vector Store ID: <code>val_bd_eid_2024_2025</code>).
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Past Campaign */}
                  <div className="border border-white/5 p-4 bg-black">
                     <div className="text-[10px] text-white/40 tracking-widest mb-4 flex justify-between">
                       <span>HISTORICAL BASELINE (EID 2024)</span>
                       <span className="text-emerald-500">RAG FETCH</span>
                     </div>
                     <div className="w-full aspect-video bg-white/5 mb-4 flex items-center justify-center text-white/20 text-xs font-sans">
                        [ SIMULATED PAST ASSET ]
                     </div>
                     <ul className="text-[10px] text-white/60 space-y-2 font-sans normal-case">
                       <li>• Primary Emotion: Nostalgia (Score: 9.2)</li>
                       <li>• Color Palette: Warm Earth Tones</li>
                       <li>• Typography: Serif (Heritage)</li>
                     </ul>
                  </div>

                  {/* Current Upload */}
                  <div className="border border-white/5 p-4 bg-black">
                     <div className="text-[10px] text-white/40 tracking-widest mb-4 flex justify-between">
                       <span>CURRENT UPLOAD</span>
                       <span className="text-blue-500">PROCESSING</span>
                     </div>
                     <div className="w-full aspect-video bg-blue-500/10 mb-4 flex items-center justify-center text-blue-400 text-xs font-sans border border-blue-500/20">
                        {uploadedFile?.name || "[ CURRENT ASSET ]"}
                     </div>
                     <ul className="text-[10px] text-white/60 space-y-2 font-sans normal-case">
                       <li>• Primary Emotion: Excitement (Score: 6.1) <span className="text-red-500 ml-1">↓</span></li>
                       <li>• Color Palette: High-Contrast Neons <span className="text-red-500 ml-1">⚠ DEVIATION</span></li>
                       <li>• Typography: Sans-Serif Modern</li>
                     </ul>
                  </div>
               </div>

               <div className="mt-8 bg-blue-500/10 border-l-4 border-blue-500 p-6">
                 <h4 className="text-xs font-bold text-white tracking-widest mb-2">EXECUTIVE RAG FEEDBACK</h4>
                 <p className="text-[10px] text-white/70 font-sans normal-case leading-relaxed">
                   <strong>CRITICAL DEVIATION DETECTED.</strong> Your historical data proves that your target demographic responds to 'Nostalgia' and 'Heritage' typography (which scored a 9.2 in 2024). The current asset uses modern neons and aggressive pacing, scoring only a 6.1 in emotional resonance. We strongly advise reverting the color grade to match the established brandbook to preserve ROAS.
                 </p>
               </div>
            </div>
          </div>

          {/* NEW SECTION: Multimodal AI Perception Grid */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-light text-white tracking-tighter">MULTIMODAL PERCEPTION ENGINE: AUDIO & VISUAL PARSING</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <p className="text-xs text-white/60 font-sans normal-case mb-8 leading-relaxed">
              Our neural engine runs real-time acoustic transcription, visual OCR scanning, and caption tone alignment tailored to the telecom region. It translates generic promotional phrasing into high-converting regional dialogue.
            </p>

            {(!reportData || (!reportData.multimodalHarmonization && !reportData.error)) ? (
              <div className="p-12 text-center border border-white/5 bg-[#0A0A0A]">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Generating Multimodal Harmonization Data...</p>
              </div>
            ) : reportData.error ? (
              <div className="p-12 text-center border border-red-500/20 bg-red-500/5 text-red-400 text-xs">
                Failed to generate multimodal harmonization data.
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

          {/* 9-Point Diagnostic Deep Dive */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-light text-white tracking-tighter">9-POINT COGNITIVE DIAGNOSTIC</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {(!reportData || (!reportData.ninePointDiagnostic && !reportData.error) || (reportData.ninePointDiagnostic && reportData.ninePointDiagnostic.length === 0)) ? (
              <div className="p-12 text-center border border-white/5 bg-[#0A0A0A]">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Generating 9-Point Data...</p>
              </div>
            ) : reportData.error ? (
              <div className="p-12 text-center border border-red-500/20 bg-red-500/5 text-red-400 text-xs">
                Failed to generate 9-point data.
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

          {/* NEW SECTION: SWARM DEMOGRAPHIC COHORT DEEP-DIVE */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-light text-white tracking-tighter">SWARM DEMOGRAPHIC COHORT DEEP-DIVE</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Age cohort resonance */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                <div>
                  <div className="text-[9px] text-emerald-500 font-bold tracking-[0.2em] mb-2 uppercase">AGE GROUP DYNAMICS</div>
                  <h4 className="text-lg font-bold text-white mb-4 tracking-widest">{targetAge}</h4>
                  <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                    Swarm nodes matching {targetAge} responded with peak attention spans. The simulated neural pathways show excellent linguistic alignment with zero slang alienation.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1 text-[10px]">
                    <span className="text-white/40">COHORT RESONANCE</span>
                    <span className="text-emerald-400 font-bold font-mono">92%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>

              {/* Income cohort resonance */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                <div>
                  <div className="text-[9px] text-emerald-500 font-bold tracking-[0.2em] mb-2 uppercase">INCOME COHORT DYNAMICS</div>
                  <h4 className="text-lg font-bold text-white mb-4 tracking-widest">{targetIncome}</h4>
                  <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                    Swarm purchase intent vectors aligned successfully with the {targetIncome} tier. Value-for-money cognitive hooks generated high positive sentiment responses.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1 text-[10px]">
                    <span className="text-white/40">COHORT RESONANCE</span>
                    <span className="text-emerald-400 font-bold font-mono">91%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '91%' }} />
                  </div>
                </div>
              </div>

              {/* Geography resonance */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                <div>
                  <div className="text-[9px] text-emerald-500 font-bold tracking-[0.2em] mb-2 uppercase">CULTURAL GEOGRAPHY DYNAMICS</div>
                  <h4 className="text-lg font-bold text-white mb-4 tracking-widest">{targetGeography}</h4>
                  <p className="text-[10px] text-white/60 font-sans normal-case leading-relaxed">
                    {radiusKm <= 15 
                      ? `Regional reach score projection successfully mapped active nodes in the ${targetGeography} region. Hyper-local dialect nuances were completely parsed.` 
                      : `Scan coverage is too wide (${radiusKm} KM). Persona nodes represent a generalized national profile, diluting hyper-local ${targetGeography} cultural markers.`}
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1 text-[10px]">
                    <span className="text-white/40">COHORT RESONANCE</span>
                    <span className="text-emerald-400 font-bold font-mono">{Math.max(48, Math.round(96 - (radiusKm * 0.48)))}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${Math.max(48, Math.round(96 - (radiusKm * 0.48)))}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: THE EXECUTIVE CHAT (Gemini Simulation) */}
      {!isFreeTier ? (
        <div className="w-96 border-l border-blue-500/20 bg-[#050505] flex flex-col shadow-[inset_0_0_30px_rgba(59,130,246,0.02)] transition-all duration-500 hover:border-blue-500/40 relative print:hidden">
          <div className="p-6 border-b border-white/10 bg-[#0A0A0A] relative z-10">
            <div className="flex justify-between items-start gap-2">
               <div>
                  <div className="text-[10px] text-blue-400 tracking-[0.3em] font-bold flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                    ONU.AI CORE
                  </div>
                  <h3 className="text-white text-xs font-bold tracking-widest">EXECUTIVE CONSULTATION</h3>
               </div>
               <span className="shrink-0 text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 font-mono tracking-widest animate-pulse">
                 [SWARM ACTIVE]
               </span>
            </div>
            <p className="text-[9px] text-white/40 mt-2 font-sans normal-case">Directly converse with the 1,500-profile simulated cohort to write scripts, adjust slogans, or review ideas in real-time.</p>
         </div>

         {/* Chat History */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <AnimatePresence>
              {chatMessages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender && (
                    <div className="flex items-center gap-1.5 mb-1 text-[8px] font-mono tracking-wider text-white/60">
                      <span className={`w-1.5 h-1.5 rounded-full ${msg.avatarColor || 'bg-blue-500'}`}></span>
                      {msg.sender.toUpperCase()}
                    </div>
                  )}
                  <div className={`max-w-[85%] p-4 text-[10px] font-sans normal-case leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-white text-black rounded-tl-lg rounded-bl-lg rounded-tr-lg' : 'bg-[#111] border border-white/10 text-white/80 rounded-tr-lg rounded-br-lg rounded-tl-lg'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
         </div>

         {/* Chat Input */}
         <div className="p-6 border-t border-white/10 bg-[#0A0A0A] relative z-10">
           <form onSubmit={handleChatSubmit} className="relative">
             <textarea 
               value={chatInput}
               onChange={(e) => setChatInput(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   handleChatSubmit(e as any);
                 }
               }}
               placeholder="Ask the 1,500-profile AI audience panel to rewrite captions, adjust scripts..."
               className="w-full bg-black border border-white/20 py-4 pl-4 pr-12 text-white text-[10px] font-sans normal-case focus:border-blue-500 outline-none transition-all rounded-sm resize-none h-14"
             />
             <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </button>
             </form>
           </div>
         </div>
       ) : (
         <div className="w-96 border-l border-white/5 bg-[#020202] flex flex-col justify-center items-center p-8 text-center print:hidden">
           <svg className="w-12 h-12 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
           <h3 className="text-white text-lg font-bold tracking-widest mb-2">SWARM CHAT LOCKED</h3>
           <p className="text-[10px] text-white/50 normal-case font-sans mb-8">
             Upgrade to the Brand Vault to interrogate the AI audience panel and receive specific rewrites or optimization instructions from 1,500 consumer profiles.
           </p>
           <Link href='/pricing' className="bg-emerald-500 text-black px-6 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-white transition-colors w-full">
             UNLOCK BRAND VAULT
           </Link>
         </div>
       )}

     </div>
   );
  };

   const ApiConsoleUI = () => {
    const curlSnippet = `curl -X POST "https://api.onu.ai/v1/swarm/initialize" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "asset_url": "https://assets.yourbrand.com/campaigns/eid-2026.mp4",
    "demographics": {
      "age": "${targetAge}",
      "income": "${targetIncome}",
      "geography": "${targetGeography}"
    },
    "historical_rag": true,
    "clearance_level": 4
  }'`;

    const pythonSnippet = `import requests

url = "https://api.onu.ai/v1/swarm/initialize"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
payload = {
    "asset_url": "https://assets.yourbrand.com/campaigns/eid-2026.mp4",
    "demographics": {
        "age": "${targetAge}",
        "income": "${targetIncome}",
        "geography": "${targetGeography}"
    },
    "historical_rag": True,
    "clearance_level": 4
}

response = requests.post(url, headers=headers, json=payload)
swarm_report = response.json()
print(f"Swarm Resonance: {swarm_report['cognitive_layers']['demographic_layer']['demo_authenticity']['score'] * 100}%")`;

    const jsSnippet = `const response = await fetch("https://api.onu.ai/v1/swarm/initialize", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    asset_url: "https://assets.yourbrand.com/campaigns/eid-2026.mp4",
    demographics: {
      age: "${targetAge}",
      income: "${targetIncome}",
      geography: "${targetGeography}"
    },
    historical_rag: true,
    clearance_level: 4
  })
});

const report = await response.json();
console.log(\`Projected ROAS Lift: \${report.projected_roas_lift * 100}%\`);`;

    const jsonResponse = `{
  "status": "complete",
  "clearance_level": 4,
  "confidence_haversine": ${(Math.max(52, Math.round(98 - (radiusKm * 0.46))) / 100).toFixed(2)},
  "overall_friction": 0.14,
  "projected_roas_lift": 0.12,
  "demographics": {
    "target_age": "${targetAge}",
    "target_income": "${targetIncome}",
    "target_geography": "${targetGeography}"
  },
  "cognitive_layers": {
    "survival_layer": {
      "reputation_risk": { "score": 0.12, "sentiment": "Hostile taglines detected" },
      "viral_hook_retention": { "score": 0.94, "dopaminergic_focus": "high" },
      "cta_friction": { "score": 0.18, "cognitive_drag": "minor color mismatch" }
    },
    "demographic_layer": {
      "demo_authenticity": { "score": 0.88, "cohort_alignment": "high" },
      "cultural_compliance": { "score": 0.91, "regional_norms": "excellent" },
      "generational_resonance": { "score": 0.85, "alienation_index": 0.02 }
    },
    "performance_layer": {
      "semantic_quality": { "score": 0.89, "persuasion_score": "optimal" },
      "information_retention": { "score": 0.82, "recall_latency": "24h recall" },
      "historical_roi_baseline": { "score": 0.95, "rag_memory_store": "val_bd_eid_2024_2025" }
    }
  }
}`;

    return (
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden relative z-10 bg-[#020202]">
        
        {/* LEFT COLUMN: DEVELOPER CONSOLE */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 border-r border-white/10 scrollbar-hide flex flex-col gap-8">
          <div>
            <div className="text-emerald-500 text-[10px] font-bold tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ONU.AI DEVELOPER PLATFORM
            </div>
            <h2 className="text-2xl lg:text-4xl font-light tracking-tighter text-white">SWARM ORCHESTRATION CONSOLE.</h2>
            <p className="text-[10px] text-white/50 normal-case font-sans mt-2 leading-relaxed max-w-2xl">
              Initialize AI audience panels, configure targets, and extract raw haversine friction data programmatically. Secure your credentials to authenticate Swarm queries.
            </p>
          </div>

          {/* API Key Box */}
          <div className="bg-[#0A0A0A] border border-white/10 p-6 flex flex-col gap-4 relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/50 tracking-widest">LIVE API CREDENTIALS</span>
              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 tracking-wider border border-emerald-500/20">CLEARANCE Lvl 4</span>
            </div>
            
            <div className="flex items-center gap-4 bg-black border border-white/10 px-4 py-3 font-mono text-[10px] relative">
              <span className="text-white/40 tracking-normal select-none">KEY:</span>
              <span className="text-emerald-400 tracking-wider flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {apiKey}
              </span>
              <button 
                onClick={handleCopyKey}
                className="text-white/50 hover:text-white transition-colors flex items-center gap-1 shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span className="text-[8px] font-sans font-bold tracking-wider">{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[8.5px] text-white/40 normal-case font-sans">Keep this key absolute secret. Unauthorized usage consumes Test-Credits.</span>
              <button 
                onClick={handleRegenerateKey}
                className="border border-white/20 px-3 py-1.5 text-[8.5px] font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                REGENERATE KEY
              </button>
            </div>
          </div>

          {/* Micro-HUD stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0A0A0A] border border-white/5 p-4 flex flex-col gap-1.5">
              <span className="text-[8px] text-white/40 tracking-wider">DAILY SWARM ALLOCATIONS</span>
              <span className="text-xs font-mono text-white">418 / 2,500</span>
              <div className="w-full h-1 bg-white/5 overflow-hidden mt-1">
                <div className="h-full bg-blue-500" style={{ width: '16.7%' }}></div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-4 flex flex-col gap-1.5">
              <span className="text-[8px] text-white/40 tracking-wider">P95 COGNITIVE LATENCY</span>
              <span className="text-xs font-mono text-emerald-400">640ms</span>
              <div className="w-full h-1 bg-white/5 overflow-hidden mt-1">
                <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-4 flex flex-col gap-1.5">
              <span className="text-[8px] text-white/40 tracking-wider">SIMULATION SUCCESS RATE</span>
              <span className="text-xs font-mono text-blue-400">99.98%</span>
              <div className="w-full h-1 bg-white/5 overflow-hidden mt-1">
                <div className="h-full bg-blue-500" style={{ width: '99.98%' }}></div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-4 flex flex-col gap-1.5">
              <span className="text-[8px] text-white/40 tracking-wider">SWARM CLUSTERS</span>
              <span className="text-xs font-mono text-indigo-400">24 ONLINE</span>
              <div className="w-full h-1 bg-white/5 overflow-hidden mt-1">
                <div className="h-full bg-indigo-500 animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          {/* SDK Code Snippets */}
          <div className="flex-1 flex flex-col border border-white/10 bg-[#0A0A0A] overflow-hidden min-h-[300px]">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/40">
              <span className="text-[9px] text-white tracking-widest font-bold">SDK INTEGRATION FRAME</span>
              <div className="flex gap-3 text-[9px] font-bold">
                <button 
                  onClick={() => setSelectedLang('curl')} 
                  className={`px-2 py-1 tracking-widest transition-colors ${selectedLang === 'curl' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white'}`}
                >
                  cURL
                </button>
                <button 
                  onClick={() => setSelectedLang('python')} 
                  className={`px-2 py-1 tracking-widest transition-colors ${selectedLang === 'python' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white'}`}
                >
                  PYTHON
                </button>
                <button 
                  onClick={() => setSelectedLang('javascript')} 
                  className={`px-2 py-1 tracking-widest transition-colors ${selectedLang === 'javascript' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white'}`}
                >
                  NODEJS
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 font-mono text-[9px] leading-relaxed text-white/70 overflow-y-auto bg-black/70 scrollbar-hide relative select-all select-text whitespace-pre">
              {selectedLang === 'curl' && curlSnippet}
              {selectedLang === 'python' && pythonSnippet}
              {selectedLang === 'javascript' && jsSnippet}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE LIVE GLOWING JSON PREVIEW */}
        <div className="w-full md:w-[480px] bg-[#030303] border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-[#0A0A0A] flex justify-between items-center shrink-0">
            <div>
              <div className="text-[10px] text-blue-500 tracking-[0.3em] font-bold flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                LIVE PROTOCOL
              </div>
              <h3 className="text-white text-xs font-bold tracking-widest">SWARM DIAGNOSTIC RESPONSE</h3>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(jsonResponse);
                alert("JSON Response Copied!");
              }}
              className="border border-white/20 hover:border-emerald-500 hover:text-emerald-400 px-3 py-1.5 text-[8.5px] font-bold tracking-wider transition-colors shrink-0"
            >
              COPY JSON
            </button>
          </div>

          {/* Glowing JSON Viewer Panel */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-hide bg-[#020202] text-xs font-mono relative">
            <div className="absolute inset-0 bg-blue-500/[0.01] pointer-events-none"></div>
            
            {/* Colorized syntax highlighting styling */}
            <div className="relative text-white/95 leading-relaxed text-[10px] normal-case tracking-normal">
              <span className="text-white/40">{"{"}</span>
              <div className="pl-4">
                <span className="text-emerald-400">"status"</span>: <span className="text-amber-300">"complete"</span>,
                <br />
                <span className="text-emerald-400">"clearance_level"</span>: <span className="text-indigo-300">4</span>,
                <br />
                <span className="text-emerald-400">"confidence_haversine"</span>: <span className="text-indigo-300">{(Math.max(52, Math.round(98 - (radiusKm * 0.46))) / 100).toFixed(2)}</span>,
                <br />
                <span className="text-emerald-400">"overall_friction"</span>: <span className="text-indigo-300">0.14</span>,
                <br />
                <span className="text-emerald-400">"projected_roas_lift"</span>: <span className="text-indigo-300">0.12</span>,
                <br />
                <span className="text-emerald-400">"demographics"</span>: <span className="text-white/40">{"{"}</span>
                <div className="pl-4">
                  <span className="text-emerald-400">"target_age"</span>: <span className="text-amber-300">"{targetAge}"</span>,
                  <br />
                  <span className="text-emerald-400">"target_income"</span>: <span className="text-amber-300">"{targetIncome}"</span>,
                  <br />
                  <span className="text-emerald-400">"target_geography"</span>: <span className="text-amber-300">"{targetGeography}"</span>
                </div>
                <span className="text-white/40">{"}"}</span>,
                <br />
                <span className="text-emerald-400">"cognitive_layers"</span>: <span className="text-white/40">{"{"}</span>
                <div className="pl-4">
                  
                  {/* Survival layer */}
                  <span className="text-emerald-400">"survival_layer"</span>: <span className="text-white/40">{"{"}</span>
                  <div className="pl-4">
                    <span className="text-emerald-400">"reputation_risk"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.12</span>, <span className="text-emerald-400">"sentiment"</span>: <span className="text-amber-300">"Hostile taglines detected"</span> <span className="text-white/40">{"}"}</span>,
                    <br />
                    <span className="text-emerald-400">"viral_hook_retention"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.94</span>, <span className="text-emerald-400">"dopaminergic_focus"</span>: <span className="text-amber-300">"high"</span> <span className="text-white/40">{"}"}</span>,
                    <br />
                    <span className="text-emerald-400">"cta_friction"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.18</span>, <span className="text-emerald-400">"cognitive_drag"</span>: <span className="text-amber-300">"minor color mismatch"</span> <span className="text-white/40">{"}"}</span>
                  </div>
                  <span className="text-white/40">{"}"}</span>,
                  <br />

                  {/* Demographic layer */}
                  <span className="text-emerald-400">"demographic_layer"</span>: <span className="text-white/40">{"{"}</span>
                  <div className="pl-4">
                    <span className="text-emerald-400">"demo_authenticity"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.88</span>, <span className="text-emerald-400">"cohort_alignment"</span>: <span className="text-amber-300">"high"</span> <span className="text-white/40">{"}"}</span>,
                    <br />
                    <span className="text-emerald-400">"cultural_compliance"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">{(Math.max(45, Math.round(95 - (radiusKm * 0.5))) / 100).toFixed(2)}</span>, <span className="text-emerald-400">"regional_norms"</span>: <span className="text-amber-300">"{radiusKm <= 15 ? 'excellent' : 'diluted'}"</span> <span className="text-white/40">{"}"}</span>,
                    <br />
                    <span className="text-emerald-400">"generational_resonance"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.85</span>, <span className="text-emerald-400">"alienation_index"</span>: <span className="text-indigo-300">0.02</span> <span className="text-white/40">{"}"}</span>
                  </div>
                  <span className="text-white/40">{"}"}</span>,
                  <br />

                  {/* Performance layer */}
                  <span className="text-emerald-400">"performance_layer"</span>: <span className="text-white/40">{"{"}</span>
                  <div className="pl-4">
                    <span className="text-emerald-400">"semantic_quality"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.89</span>, <span className="text-emerald-400">"persuasion_score"</span>: <span className="text-amber-300">"optimal"</span> <span className="text-white/40">{"}"}</span>,
                    <br />
                    <span className="text-emerald-400">"information_retention"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.82</span>, <span className="text-emerald-400">"recall_latency"</span>: <span className="text-amber-300">"24h recall"</span> <span className="text-white/40">{"}"}</span>,
                    <br />
                    <span className="text-emerald-400">"historical_roi_baseline"</span>: <span className="text-white/40">{"{"}</span> <span className="text-emerald-400">"score"</span>: <span className="text-indigo-300">0.95</span>, <span className="text-emerald-400">"rag_memory_store"</span>: <span className="text-amber-300">"val_bd_eid_2024_2025"</span> <span className="text-white/40">{"}"}</span>
                  </div>
                  <span className="text-white/40">{"}"}</span>

                </div>
                <span className="text-white/40">{"}"}</span>
              </div>
              <span className="text-white/40">{"}"}</span>
            </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#D9D9D9] font-[family-name:var(--font-space)] uppercase text-xs tracking-wider selection:bg-blue-500/30 flex flex-col overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
      
      {/* Global Header */}
      <header className="border-b border-white/10 px-8 py-6 flex items-center justify-between relative z-50 bg-[#050505]/80 backdrop-blur-md print:hidden">
        <div className="flex items-center gap-8">
          <Link href='/' className="font-bold text-white tracking-[0.2em] border border-white/20 px-3 py-1 bg-white/5 hover:bg-white hover:text-black transition-colors">
            Onu.AI
          </Link>
          <div className="flex gap-6 items-center text-[10px] font-bold tracking-widest text-white/50">
            <button 
              onClick={() => {
                setActiveTab('workspace');
                setAppMode('upload');
              }} 
              className={`transition-colors ${activeTab === 'workspace' && appMode !== 'enterprise_report' ? 'text-white border-b-2 border-white pb-1' : 'hover:text-white'}`}
            >
              WORKSPACE
            </button>
            {!isFreeTier && (
              <button 
                onClick={() => {
                  setActiveTab('workspace');
                  setAppMode('enterprise_report');
                }} 
                className={`transition-colors ${activeTab === 'workspace' && appMode === 'enterprise_report' ? 'text-emerald-400 font-bold border-b-2 border-emerald-500 pb-1' : 'hover:text-emerald-400'}`}
              >
                REPORT ⚡
              </button>
            )}
            <button onClick={() => setActiveTab('api')} className={`transition-colors ${activeTab === 'api' ? 'text-white border-b-2 border-white pb-1' : 'hover:text-white'}`}>API</button>
            <Link href='/enterprise' className="hover:text-white transition-colors">ENTERPRISE</Link>
            <Link href='/pricing' className="hover:text-white transition-colors">PRICING</Link>
           <Link href="/developer" className="hover:text-blue-400 transition-colors">DEVELOPER API</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest">
           {/* Dynamic Simulator Tier Switcher */}
           <div className="flex items-center gap-3">
             <span className="text-white/40 text-[9px] tracking-widest">SIMULATOR TIER:</span>
             <div className="flex border border-white/10 bg-black overflow-hidden rounded-sm">
               <button 
                 onClick={() => {
                   router.push('/workspace?tier=free');
                   setAppMode('upload');
                 }}
                 className={`px-3 py-1.5 transition-all text-[9px] ${isFreeTier ? 'bg-blue-600 text-white font-bold' : 'hover:text-white text-white/40'}`}
               >
                 FREE DIAGNOSTIC
               </button>
               <button 
                 onClick={() => {
                   router.push('/workspace');
                   setAppMode('upload');
                 }}
                 className={`px-3 py-1.5 transition-all text-[9px] ${!isFreeTier ? 'bg-emerald-500 text-black font-bold' : 'hover:text-white text-white/40'}`}
               >
                 BRAND VAULT ⚡
               </button>
             </div>
           </div>

           <div className="flex items-center gap-2 border-l border-white/10 pl-6 h-6">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-emerald-500">API CONNECTED</span>
           </div>
        </div>
      </header>

      {/* BRAND VAULT NEURAL INGESTION MODAL */}
      <AnimatePresence>
        {isBrandVaultOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0A0A0A] border border-blue-500/20 w-full max-w-5xl h-[85vh] flex flex-col relative rounded-sm shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden"
            >
              {/* Top accent glow line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-emerald-500 to-indigo-500"></div>
              
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-start bg-[#020202]">
                <div>
                  <div className="text-[10px] text-blue-400 tracking-[0.3em] font-bold flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    BRAND VAULT / EXCLUSIVE INGESTION MODULE
                  </div>
                  <h3 className="text-white text-lg font-bold tracking-widest">NEURAL IDENTITY & CAMPAIGN CONTEXT</h3>
                </div>
                <button 
                  onClick={() => setIsBrandVaultOpen(false)}
                  className="text-white/40 hover:text-white transition-colors text-xs font-mono tracking-widest border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-sm"
                >
                  [ CLOSE X ]
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#050505]">
                
                {/* Left Column: Brand Guidelines & Book */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      01 / Brand Book & Identity Upload
                    </h4>
                    <p className="text-[9px] text-white/50 font-sans normal-case mb-4">
                      Upload your Brand Identity Guidelines, Color Palette Rules, and Logo specifications. Supporting PDF, DOCX, Images, and Video guides.
                    </p>
                    
                    <div className="border border-dashed border-white/20 hover:border-blue-500/50 p-6 rounded-sm text-center bg-black/40 transition-colors relative">
                      <input 
                        type="file" 
                        multiple 
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4,.webm,.mov"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files) {
                            const newFiles = Array.from(e.target.files);
                            setBrandFiles(prev => [...prev, ...newFiles]);
                            const newMeta = newFiles.map(f => ({ name: f.name, size: f.size, type: f.type }));
                            setMockBrandFiles(prev => {
                              const updated = [...prev, ...newMeta];
                              localStorage.setItem('brandFileNames', JSON.stringify(updated));
                              return updated;
                            });
                          }
                        }}
                      />
                      <svg className="w-6 h-6 text-white/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                      <span className="text-[9px] font-bold text-white/60 tracking-wider">[ BROWSE OR DRAG BRAND BOOK ]</span>
                    </div>

                    {/* Uploaded files list */}
                    {mockBrandFiles.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {mockBrandFiles.map((file, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-black border border-white/5 p-2 rounded-sm text-[9px] font-mono">
                            <span className="text-white/70 truncate max-w-[250px]">{file.name} ({(file.size/1024/1024).toFixed(2)} MB)</span>
                            <button 
                              onClick={() => {
                                setBrandFiles(prev => prev.filter((_, i) => i !== idx));
                                setMockBrandFiles(prev => {
                                  const updated = prev.filter((_, i) => i !== idx);
                                  localStorage.setItem('brandFileNames', JSON.stringify(updated));
                                  return updated;
                                });
                              }}
                              className="text-red-500 hover:text-red-400 font-bold"
                            >
                              [ REMOVE ]
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      02 / Brand Guidelines Text Box
                    </h4>
                    <p className="text-[9px] text-white/50 font-sans normal-case mb-2">
                      Enter tone-of-voice context, target copywriting phrasing, or prohibited elements.
                    </p>
                    <textarea 
                      value={brandBook}
                      onChange={(e) => {
                        setBrandBook(e.target.value);
                        localStorage.setItem('brandBook', e.target.value);
                      }}
                      placeholder="e.g. 'Use premium, evocative language. Never mention discounts directly; highlight lifestyle upgrades and MFS cashbacks instead. Color harmony should remain warm and nostalgic...'"
                      className="w-full bg-black border border-white/20 p-4 text-white text-xs font-sans normal-case focus:border-blue-500 outline-none resize-y h-48"
                    />
                  </div>
                </div>

                {/* Right Column: Case History & Past Campaigns */}
                <div className="space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      03 / Successful & Failed Campaigns Context
                    </h4>
                    <p className="text-[9px] text-white/50 font-sans normal-case mb-4">
                      Upload mock or real historical reports, video scripts, or static creatives from past successes and failures. Supports PDF, Video, Audio, and Image.
                    </p>
                    
                    <div className="border border-dashed border-white/20 hover:border-emerald-500/50 p-6 rounded-sm text-center bg-black/40 transition-colors relative">
                      <input 
                        type="file" 
                        multiple 
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4,.webm,.mov"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files) {
                            const newFiles = Array.from(e.target.files);
                            setPastCampaignFiles(prev => [...prev, ...newFiles]);
                            const newMeta = newFiles.map(f => ({ name: f.name, size: f.size, type: f.type }));
                            setMockPastCampaignFiles(prev => {
                              const updated = [...prev, ...newMeta];
                              localStorage.setItem('pastCampaignFileNames', JSON.stringify(updated));
                              return updated;
                            });
                          }
                        }}
                      />
                      <svg className="w-6 h-6 text-white/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      <span className="text-[9px] font-bold text-white/60 tracking-wider">[ BROWSE PAST CAMPAIGN FILES ]</span>
                    </div>

                    {/* Uploaded files list */}
                    {mockPastCampaignFiles.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {mockPastCampaignFiles.map((file, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-black border border-white/5 p-2 rounded-sm text-[9px] font-mono">
                            <span className="text-white/70 truncate max-w-[250px]">{file.name} ({(file.size/1024/1024).toFixed(2)} MB)</span>
                            <button 
                              onClick={() => {
                                setPastCampaignFiles(prev => prev.filter((_, i) => i !== idx));
                                setMockPastCampaignFiles(prev => {
                                  const updated = prev.filter((_, i) => i !== idx);
                                  localStorage.setItem('pastCampaignFileNames', JSON.stringify(updated));
                                  return updated;
                                });
                              }}
                              className="text-red-500 hover:text-red-400 font-bold"
                            >
                              [ REMOVE ]
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      04 / Case History Context Text
                    </h4>
                    <p className="text-[9px] text-white/50 font-sans normal-case mb-2">
                      Detail successes & failures here to train the neural model on high-performance vector bounds.
                    </p>
                    <textarea 
                      value={pastCampaignText}
                      onChange={(e) => {
                        setPastCampaignText(e.target.value);
                        localStorage.setItem('pastCampaignText', e.target.value);
                      }}
                      placeholder="e.g. 'SUCCESS: Our Eid 2024 nostalgia video campaign achieved a 4.2x Projected return on ad spend because it focused heavily on heritage architecture. FAILURE: The Boishakh 2025 discount overlay caused severe customer friction due to generic promo codes that diluted premium branding.'"
                      className="w-full bg-black border border-white/20 p-4 text-white text-xs font-sans normal-case focus:border-emerald-500 outline-none resize-y h-48"
                    />
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-[#020202] flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-[9px] text-white/50 font-sans normal-case">
                  <span className="text-emerald-400 font-bold tracking-wider">NEURAL TOKEN OPTIMIZER: ACTIVE</span> | Preserving context locally saves up to 45,000 tokens per analysis run, lowering per-check operations cost.
                </div>
                
                <button 
                  onClick={() => {
                    setIsSyncing(true);
                    setTimeout(() => {
                      setIsSyncing(false);
                      setIsBrandVaultOpen(false);
                    }, 1200);
                  }}
                  className="bg-emerald-500 hover:bg-white text-black font-bold tracking-[0.2em] px-8 py-3 rounded-sm text-[10px] transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                  {isSyncing ? 'SYNCHRONIZING NEURAL LAYERS...' : 'SAVE & INTEGRATE BRAND VAULT ⚡'}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {activeTab === 'workspace' && (
          <AnimatePresence mode="wait">
            {appMode === 'upload' && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                {PreSimulationUI()}
              </motion.div>
            )}
            
            {appMode === 'simulating' && (
              <motion.div key="simulating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                {SimulationUI()}
              </motion.div>
            )}

            {appMode === 'enterprise_report' && (
              <motion.div key="enterprise_report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0">
                {EnterpriseReport()}
              </motion.div>
            )}

          </AnimatePresence>
        )}

        {activeTab === 'api' && (
          ApiConsoleUI()
        )}
      </main>

    </div>
  );
}

export default function Workspace() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/50 font-mono text-xs tracking-widest uppercase">INITIALIZING PROTOCOL...</div>}>
      <WorkspaceContent />
    </React.Suspense>
  );
}
