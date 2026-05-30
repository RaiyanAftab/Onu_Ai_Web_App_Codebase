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
    const campaignPrompt = formData.get('campaignPrompt') as string || '';
    const isFreeTier = formData.get('isFreeTier') === 'true';
    const rawBrandBook = formData.get('brandBook') as string || '';
    const brandBook = retrieveBrandGuidelines(rawBrandBook, campaignPrompt);
    const targetAge = formData.get('targetAge') as string || '';
    const targetIncome = formData.get('targetIncome') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let part: any;

    if (file.type.startsWith('video/')) {
        const tmpPath = path.join(os.tmpdir(), `upload_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
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

    const sysInstruct = `You are the Onu.AI AI Audience Panel Aggregator, an advanced AI system analyzing marketing assets for a hyper-local Bangladeshi audience.
Your task is to analyze the provided asset (image or video) and the user's campaign objective to generate highly realistic, insightful, and actionable feedback.
The feedback MUST feel like it was synthesized from 1,500 local Bangladeshi personas (the "Swarm").

CRITICAL INSTRUCTIONS FOR REALISM:
1. DO NOT provide generic marketing advice. Your actionableFeedback and optimizationPlans MUST explicitly reference specific visual or textual elements in the uploaded asset.
2. The evidenceQuotes MUST sound exactly like real Bangladeshi consumers. 
3. ALL numbers and text in the report MUST be generated dynamically based on the specific asset. If the asset is poor, the metrics should reflect that.

If the user is on the Free Tier (isFreeTier=${isFreeTier}), provide a high-level diagnostic.
If the user is on the Enterprise Tier (isFreeTier=${isFreeTier}), provide extremely detailed, culturally nuanced, and hyper-local feedback.
If the user has passed "Select All" for Target Age or Target Income, you MUST explicitly detail the pros and cons of this broad demographic targeting in the actionableFeedback and optimizationPlans.
${brandBook ? '\\nCRITICAL BRAND GUIDELINES (BRAND VAULT):\\n' + brandBook + '\\nYou MUST strictly adhere to these guidelines in your feedback and evaluation.' : ''}

Return a JSON object containing EXACTLY this structure:
{
  "dataConfidence": 85,
  "overallFriction": 20,
  "roasPotential": 15,
  "actionableFeedback": ["Feedback 1", "Feedback 2", "Feedback 3"],
  "optimizationPlans": [
    { "title": "Plan 1", "description": "Desc", "example": "Example", "impact": "-5% Friction" },
    { "title": "Plan 2", "description": "Desc", "example": "Example", "impact": "+10% ROAS" },
    { "title": "Plan 3", "description": "Desc", "example": "Example", "impact": "+5% Confidence" }
  ],
  "multimodalHarmonization": {
    "dialogue": { "raw": "original text", "adjusted": "banglish text", "rationale": "reasoning" },
    "ocr": { "raw": "original overlay", "adjusted": "better overlay", "rationale": "reasoning" },
    "caption": { "raw": "original caption", "adjusted": "better caption", "rationale": "reasoning" }
  },
  "ninePointDiagnostic": [
    { "layer": "SURVIVAL LAYER", "metricName": "REPUTATION RISK", "value": "12%", "label": "RISK", "description": "Specific finding...", "color": "red" },
    { "layer": "SURVIVAL LAYER", "metricName": "VIRAL HOOK RETENTION", "value": "94%", "label": "RETENTION", "description": "...", "color": "amber" },
    { "layer": "SURVIVAL LAYER", "metricName": "CTA FRICTION SCORE", "value": "18%", "label": "FRICTION", "description": "...", "color": "orange" },
    { "layer": "DEMOGRAPHIC LAYER", "metricName": "DEMO AUTHENTICITY", "value": "88%", "label": "ALIGNMENT", "description": "...", "color": "emerald" },
    { "layer": "DEMOGRAPHIC LAYER", "metricName": "CULTURAL COMPLIANCE", "value": "95%", "label": "COMPLIANCE", "description": "...", "color": "emerald" },
    { "layer": "DEMOGRAPHIC LAYER", "metricName": "GENERATIONAL RESONANCE", "value": "85%", "label": "RESONANCE", "description": "...", "color": "emerald" },
    { "layer": "PERFORMANCE LAYER", "metricName": "SEMANTIC QUALITY", "value": "89%", "label": "QUALITY", "description": "...", "color": "blue" },
    { "layer": "PERFORMANCE LAYER", "metricName": "INFORMATION RETENTION", "value": "82%", "label": "RETENTION", "description": "...", "color": "blue" },
    { "layer": "PERFORMANCE LAYER", "metricName": "COGNITIVE LOAD", "value": "15%", "label": "LOAD", "description": "...", "color": "indigo" }
  ]
}
Ensure EVERYTHING is detailed, professional, and directly addresses the visual/audio elements in the uploaded asset. Do not use generic fallback texts.`;

    const userPrompt = `Campaign Objective: ${campaignPrompt || 'None provided.'}
Target Age: ${targetAge}
Target Income: ${targetIncome}
Tier: ${isFreeTier ? 'Free Diagnostic' : 'Enterprise Vault'}
Analyze the attached asset and provide the JSON report.`;

    const modelToUse = isFreeTier ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';

    const response = await ai.models.generateContent({
      model: modelToUse,
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
        temperature: 0.1,
        topP: 0.1,
        topK: 1,
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dataConfidence: { type: Type.INTEGER },
            overallFriction: { type: Type.INTEGER },
            roasPotential: { type: Type.INTEGER },
            actionableFeedback: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            optimizationPlans: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  example: { type: Type.STRING },
                  impact: { type: Type.STRING }
                },
                required: ["title", "description", "example", "impact"]
              }
            },
            multimodalHarmonization: {
              type: Type.OBJECT,
              properties: {
                dialogue: {
                  type: Type.OBJECT,
                  properties: {
                    raw: { type: Type.STRING },
                    adjusted: { type: Type.STRING },
                    rationale: { type: Type.STRING }
                  },
                  required: ["raw", "adjusted", "rationale"]
                },
                ocr: {
                  type: Type.OBJECT,
                  properties: {
                    raw: { type: Type.STRING },
                    adjusted: { type: Type.STRING },
                    rationale: { type: Type.STRING }
                  },
                  required: ["raw", "adjusted", "rationale"]
                },
                caption: {
                  type: Type.OBJECT,
                  properties: {
                    raw: { type: Type.STRING },
                    adjusted: { type: Type.STRING },
                    rationale: { type: Type.STRING }
                  },
                  required: ["raw", "adjusted", "rationale"]
                }
              },
              required: ["dialogue", "ocr", "caption"]
            },
            ninePointDiagnostic: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  layer: { type: Type.STRING },
                  metricName: { type: Type.STRING },
                  value: { type: Type.STRING },
                  label: { type: Type.STRING },
                  description: { type: Type.STRING },
                  color: { type: Type.STRING }
                },
                required: ["layer", "metricName", "value", "label", "description", "color"]
              }
            }
          },
          required: [
            "dataConfidence",
            "overallFriction",
            "roasPotential",
            "actionableFeedback",
            "optimizationPlans",
            "multimodalHarmonization",
            "ninePointDiagnostic"
          ]
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
    console.error('Analyze API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze' }, { status: 500 });
  }
}
