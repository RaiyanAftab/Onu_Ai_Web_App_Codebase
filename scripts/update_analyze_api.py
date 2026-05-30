with open('src/app/api/analyze/route.ts', 'w', encoding='utf-8') as f:
    f.write("""import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const campaignPrompt = formData.get('campaignPrompt') as string || '';
    const isFreeTier = formData.get('isFreeTier') === 'true';
    const brandBook = formData.get('brandBook') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let part: any;

    if (file.type.startsWith('video/')) {
        const tmpPath = path.join(os.tmpdir(), `upload_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
        await fs.writeFile(tmpPath, buffer);
        
        const uploadResult = await ai.files.upload({ file: tmpPath, mimeType: file.type });
        
        let fileState = await ai.files.get({ name: uploadResult.name });
        while (fileState.state === 'PROCESSING') {
            await new Promise(resolve => setTimeout(resolve, 2000));
            fileState = await ai.files.get({ name: uploadResult.name });
        }
        
        if (fileState.state === 'FAILED') {
            throw new Error('Video processing failed.');
        }

        part = {
            fileData: {
                fileUri: uploadResult.uri,
                mimeType: uploadResult.mimeType
            }
        };
    } else {
        part = {
            inlineData: {
                data: buffer.toString('base64'),
                mimeType: file.type
            }
        };
    }

    const sysInstruct = `You are the Onu.AI Cognitive Swarm Aggregator, an advanced AI system analyzing marketing assets for a hyper-local audience.
Your task is to analyze the provided asset (image or video) and the user's campaign objective to generate highly realistic, insightful, and actionable feedback.
The feedback should feel like it was synthesized from 1,500 local personas (the "Swarm").

If the user is on the Free Tier (isFreeTier=${isFreeTier}), provide a high-level diagnostic.
If the user is on the Enterprise Tier (isFreeTier=${isFreeTier}), provide extremely detailed, culturally nuanced, and hyper-local feedback.
${brandBook ? '\\nCRITICAL BRAND GUIDELINES (BRAND VAULT):\\n' + brandBook + '\\nYou MUST strictly adhere to these guidelines in your feedback and evaluation.' : ''}

Return a JSON object containing EXACTLY:
{
  "dataConfidence": number (between 70 and 99),
  "overallFriction": number (between 5 and 30),
  "roasPotential": number (between 8 and 25),
  "actionableFeedback": [
     // 3 to 4 very specific, actionable directives for improving the asset based on the prompt and brand guidelines.
  ],
  "evidenceQuotes": [
     // 2 fictional personas giving feedback on the asset.
     { "personaName": "Rahim (25, Student)", "personaColor": "bg-blue-500", "quote": "I like the colors but it feels too corporate..." }
  ]
}
Ensure actionableFeedback directives are detailed, professional, and directly address the visual/audio elements in the uploaded asset.`;

    const userPrompt = `Campaign Objective: ${campaignPrompt || 'None provided.'}
Tier: ${isFreeTier ? 'Free Diagnostic' : 'Enterprise Vault'}
Analyze the attached asset and provide the JSON report.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: userPrompt },
            part
          ]
        }
      ],
      config: {
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (text) {
      const parsedData = JSON.parse(text);
      return NextResponse.json(parsedData);
    }
    
    throw new Error('No response from Gemini');

  } catch (error: any) {
    console.error('Analyze API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze' }, { status: 500 });
  }
}
""")
print("analyze route updated")
