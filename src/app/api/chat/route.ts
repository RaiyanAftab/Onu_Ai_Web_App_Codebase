import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { retrieveBrandGuidelines } from '../utils/rag';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const chatHistoryRaw = formData.get('chatHistory') as string;
    const userMessage = formData.get('userMessage') as string || '';
    const targetGeography = formData.get('targetGeography') as string || '';
    const campaignPrompt = formData.get('campaignPrompt') as string || '';
    const rawBrandBook = formData.get('brandBook') as string || '';
    const brandBook = retrieveBrandGuidelines(rawBrandBook, `${userMessage} ${campaignPrompt}`);
    const isFreeTier = formData.get('isFreeTier') === 'true';

    let chatHistory = [];
    if (chatHistoryRaw) {
        try {
            chatHistory = JSON.parse(chatHistoryRaw);
        } catch(e) {}
    }

    let filePart = null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      if (file.type.startsWith('video/')) {
          const tmpPath = path.join(os.tmpdir(), `chat_upload_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
          await fs.writeFile(tmpPath, buffer);
          
          const uploadResult = await ai.files.upload({ file: tmpPath, config: { mimeType: file.type } });
          
          let fileState = await ai.files.get({ name: uploadResult.name as string });
          while (fileState.state === 'PROCESSING') {
              await new Promise(resolve => setTimeout(resolve, 2000));
              fileState = await ai.files.get({ name: uploadResult.name as string });
          }
          
          if (fileState.state === 'FAILED') {
              throw new Error('Video processing failed.');
          }

          filePart = {
              fileData: {
                  fileUri: uploadResult.uri,
                  mimeType: uploadResult.mimeType
              }
          };
      } else {
          filePart = {
              inlineData: {
                  data: buffer.toString('base64'),
                  mimeType: file.type
              }
          };
      }
    }

    const sysInstruct = `You are the Onu.AI AI Audience Panel Aggregator. 
The user is interacting with you to get feedback on a marketing asset targeted at ${targetGeography || 'a specific region in Bangladesh'}.
Your objective is to act as an advanced AI that aggregates the opinions of 1,500 simulated local Bangladeshi personas.

CRITICAL INSTRUCTIONS FOR REALISM:
1. The evidenceQuotes MUST sound exactly like real Bangladeshi consumers. Use local expressions, Hinglish/Banglish (if appropriate for the persona's demographic), and specific, grounded opinions referencing things like local apps (Pathao, Chorki, bKash) or areas (Gulshan, Dhanmondi, Mirpur).
2. Do not be overly polite or generic. If the asset has flaws, the personas should be critical in an authentic way.
3. Your actionable feedback MUST be data-backed and reference specific elements in the user's prompt or asset.

${brandBook ? '\\nCRITICAL BRAND GUIDELINES (BRAND VAULT):\\n' + brandBook + '\\nYou MUST strictly adhere to these guidelines in your feedback and evaluation.' : ''}

When the user asks for feedback or asks a question about the asset (image or video):
1. Provide a concise summary of what the personas think.
2. Provide 1 or 2 evidence quotes from fictional Bangladeshi personas (include Name, Age, Occupation, Location, and a very localized quote).
3. Provide actionable feedback to improve the asset.

Return EXACTLY a JSON object with this structure:
{
  "summary": "String explaining the general consensus of the swarm",
  "evidence": [
    {
      "personaName": "Fahim (22, NSU Student, Bashundhara)",
      "personaColor": "bg-blue-500",
      "quote": "Bhai, design ta smooth but message ta clear na. Ami ashole bujhi nai offer ta ki."
    }
  ],
  "feedback": "String providing direct, actionable feedback to the user on how to improve the asset based on their question."
}`;

    const contents: any[] = [];
    
    // Pass previous chat history to maintain context
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const msg of chatHistory) {
        if (msg.role === 'user') {
           contents.push({ role: 'user', parts: [{ text: msg.text }] });
        } else if (msg.role === 'system') {
           contents.push({ role: 'model', parts: [{ text: msg.text }] });
        }
      }
    }

    // Pass the new user message and the image
    const userParts: any[] = [{ text: `User Prompt: ${userMessage}\nOriginal Campaign Objective: ${campaignPrompt || 'None'}` }];
    
    if (filePart) {
      userParts.push(filePart);
    }

    contents.push({
      role: 'user',
      parts: userParts
    });

    const modelToUse = isFreeTier ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: contents,
      config: {
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            evidence: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  personaName: { type: Type.STRING },
                  personaColor: { type: Type.STRING },
                  quote: { type: Type.STRING }
                },
                required: ["personaName", "personaColor", "quote"]
              }
            },
            feedback: { type: Type.STRING }
          },
          required: ["summary", "evidence", "feedback"]
        }
      }
    });

    const text = response.text;
    if (text) {
      const parsedData = JSON.parse(text);
      return NextResponse.json(parsedData);
    }
    
    throw new Error('No response from Gemini');

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to chat' }, { status: 500 });
  }
}
