import re

file_path = '/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/api/analyze/route.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Type to imports
if "import { GoogleGenAI } from '@google/genai';" in content:
    content = content.replace("import { GoogleGenAI } from '@google/genai';", "import { GoogleGenAI, Type } from '@google/genai';")

# Add responseSchema to config
target_config = """      config: {
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
      }"""

replace_config = """      config: {
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dataConfidence: { type: Type.NUMBER },
            overallFriction: { type: Type.NUMBER },
            roasPotential: { type: Type.NUMBER },
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
                }
              }
            },
            evidenceQuotes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  personaName: { type: Type.STRING },
                  personaColor: { type: Type.STRING },
                  quote: { type: Type.STRING }
                }
              }
            }
          },
          required: ["dataConfidence", "overallFriction", "roasPotential", "actionableFeedback", "optimizationPlans"]
        }
      }"""

if target_config in content:
    content = content.replace(target_config, replace_config)
    print("Replaced config!")
else:
    print("Could not find target config!")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done patching analyze route")
