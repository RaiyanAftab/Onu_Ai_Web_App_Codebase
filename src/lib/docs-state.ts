import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

// Define the shape of our state
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface DocsState {
  visibility: boolean;
  scheduleStart: string;
  scheduleEnd: string;
  pitchDeck: {
    problem: string;
    solution: string;
    valueProps: string[];
  };
  team: TeamMember[];
  technicalArchitecture: {
    agents: string;
    rag: string;
  };
}

// Supabase client (only initialized if env vars are present)
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/['"]/g, '');
if (supabaseUrl) {
  if (supabaseUrl.endsWith('/')) {
    supabaseUrl = supabaseUrl.slice(0, -1);
  }
  if (supabaseUrl.endsWith('/rest/v1')) {
    supabaseUrl = supabaseUrl.slice(0, -8);
  }
  if (supabaseUrl.endsWith('/')) {
    supabaseUrl = supabaseUrl.slice(0, -1);
  }
}

const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim().replace(/['"]/g, '');
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// The fallback JSON file path (for local dev without Supabase)
const JSON_FILE_PATH = path.join(process.cwd(), "src/data/docs-state.json");

/**
 * Gets the current docs state.
 * Tries Supabase first, falls back to local JSON if not configured.
 */
export async function getDocsState(): Promise<DocsState> {
  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('docs_settings')
        .select('state')
        .eq('id', 'singleton')
        .single();
        
      if (!error && data?.state) {
        return data.state as DocsState;
      }
      
      // Auto-initialize standard default state if table exists but singleton row is missing
      if (error && error.code === 'PGRST116') {
        console.log("docs_settings row 'singleton' not found, initializing default state...");
        const defaultState: DocsState = {
          visibility: true,
          scheduleStart: "2026-05-01T00:00",
          scheduleEnd: "2026-12-31T23:59",
          pitchDeck: {
            problem: "Marketing campaigns cost millions of dollars, yet reviewing them against detailed brand manuals is manual, slow, and subjective. Missing an exact guideline color, voice compliance parameter, or target demographic expectation is a massive risk.",
            solution: "**onu.ai** provides a self-contained, real-time diagnostic engine that parses brand guidelines, posters, and video frames simultaneously—quantifying alignment and providing an interactive executive persona debating swarm.",
            valueProps: [
              "**Unified Multimodal Auditing:** Drag and drop guidelines, images, and long video assets. Gemini extracts visual, audio, and text elements simultaneously.",
              "**Actionable Scorecard metrics:** Objective ratings for rep risk, compliance, generative hook retention, generational appeal, and cognitive load.",
              "**The Strategic Swarm:** A live, event-driven playground enabling you to debate layout decisions directly with AI specialist agents (CMO, PR, Creative Director)."
            ]
          },
          team: [
            {
              name: "Jane Doe",
              role: "CEO & Founder",
              bio: "Former Product Lead at Google. Passionate about AI and brand compliance."
            },
            {
              name: "John Smith",
              role: "CTO",
              bio: "Ex-Stripe Engineer. Specializes in multi-agent architectures and high-performance serverless systems."
            }
          ],
          technicalArchitecture: {
            agents: "Rather than running heavy Python agent frameworks (which add massive dependencies, memory bloat, and network latency to edge environments), we custom-engineered an event-driven multi-agent routing architecture directly in Next.js Serverless.",
            rag: "To guarantee absolute compliance without the lag, cost, and complexity of hosting an external vector database on serverless cold starts, we built a fully custom, localized RAG utility directly in Next.js Serverless."
          }
        };
        
        const { error: insertError } = await supabase
          .from('docs_settings')
          .insert({ id: 'singleton', state: defaultState });
          
        if (!insertError) {
          return defaultState;
        }
        console.error("Failed to initialize default row in Supabase:", insertError.message);
      } else {
        console.warn("Supabase query failed or no table found:", error?.message || error);
      }
    } catch (e) {
      console.error("Supabase connection error:", e);
    }
  }

  // 2. Fallback to Local JSON
  try {
    const fileContent = await fs.readFile(JSON_FILE_PATH, "utf-8");
    return JSON.parse(fileContent) as DocsState;
  } catch (error) {
    console.error("Failed to read fallback JSON:", error);
    // Return a safe default if everything fails
    return {
      visibility: false,
      scheduleStart: "2026-05-01T00:00",
      scheduleEnd: "2026-12-31T23:59",
      pitchDeck: { problem: "", solution: "", valueProps: [] },
      team: [],
      technicalArchitecture: { agents: "", rag: "" }
    };
  }
}

/**
 * Updates the docs state.
 * Tries Supabase first, falls back to local JSON if not configured.
 */
export async function updateDocsState(newState: Partial<DocsState>): Promise<DocsState> {
  // Get current state to merge
  const currentState = await getDocsState();
  const mergedState = { ...currentState, ...newState };

  // 1. Try Supabase
  if (supabase) {
    try {
      const { error } = await supabase
        .from('docs_settings')
        .upsert({ id: 'singleton', state: mergedState });
        
      if (!error) {
        return mergedState;
      }
      console.error("Failed to update Supabase:", error.message);
      throw new Error(`Supabase DB Error: ${error.message} (Code: ${error.code}). Make sure public.docs_settings table exists.`);
    } catch (e) {
      console.error("Supabase update error:", e);
      throw e;
    }
  }

  // 2. Fallback to Local JSON
  try {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(mergedState, null, 2), "utf-8");
    return mergedState;
  } catch (error) {
    console.error("Failed to write to fallback JSON:", error);
    throw new Error("Failed to save state.");
  }
}
