import { NextResponse } from 'next/server';
import { getLeadArchetypes } from '@/lib/persona-engine/matcher';
import { generatePersonaSystemInstruction } from '@/lib/persona-engine/prompts';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client. It will automatically pick up GEMINI_API_KEY from .env
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      targetGeography = "All Regions", 
      targetAgeGroup = "Any Age", 
      targetIncomeGroup = "Any Income",
      campaignText = "",
      image = ""
    } = body;

    let base64Data = null;
    let mimeType = 'image/jpeg';

    if (image) {
      const match = image.match(/^data:(image\/[a-zA-Z]*);base64,([^"]*)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      } else {
        base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      }
    }

    // 1. Get the matching personas
    const leadArchetypes = getLeadArchetypes(targetGeography, targetAgeGroup, targetIncomeGroup, 3);
    
    // 2. Run inference in parallel for all selected lead archetypes
    const swarmResponses = await Promise.all(leadArchetypes.map(async (persona) => {
      const sysInstruct = generatePersonaSystemInstruction(persona);
      
      const contents: any[] = [];
      const userParts: any[] = [{ text: `Campaign text provided by user: "${campaignText}"\nPlease provide your thoughts on this campaign as your specific persona.` }];
      
      if (base64Data) {
        userParts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        });
      }

      contents.push({
        role: 'user',
        parts: userParts
      });
      
      try {
        // Use gemini-1.5-flash for incredibly fast zero-latency conversational responses
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: contents,
          config: {
            systemInstruction: sysInstruct,
          }
        });

        return {
          personaId: persona.id,
          name: persona.name,
          neighborhood: persona.geography.neighborhood,
          avatar: "👤", // Placeholder
          response: response.text?.trim() || "No response generated.",
          rawPersonaData: persona // useful for the UI to show the 'why'
        };
      } catch (err: any) {
        console.error(`Gemini generation failed for persona ${persona.name}:`, err);
        return {
          personaId: persona.id,
          name: persona.name,
          neighborhood: persona.geography.neighborhood,
          avatar: "⚠️",
          response: "Error: AI Inference failed due to rate limit or API key issue.",
          rawPersonaData: persona
        };
      }
    }));

    // 3. Return the array of hyper-realistic responses
    return NextResponse.json({
      success: true,
      archetypesSampled: leadArchetypes.length,
      swarm: swarmResponses
    });

  } catch (error: any) {
    console.error("Persona Engine Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
