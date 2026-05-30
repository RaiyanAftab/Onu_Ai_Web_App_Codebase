import re

# 1. Update API route
api_file = '/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/api/analyze/route.ts'
with open(api_file, 'r', encoding='utf-8') as f:
    api_content = f.read()

new_sys_instruct = """    const sysInstruct = `You are the Onu.AI Cognitive Swarm Aggregator, an advanced AI system analyzing marketing assets for a hyper-local Bangladeshi audience.
Your task is to analyze the provided asset (image or video) and the user's campaign objective to generate highly realistic, insightful, and actionable feedback.
The feedback MUST feel like it was synthesized from 1,500 local Bangladeshi personas (the "Swarm").

CRITICAL INSTRUCTIONS FOR REALISM:
1. DO NOT provide generic marketing advice. Your actionableFeedback and optimizationPlans MUST explicitly reference specific visual or textual elements in the uploaded asset.
2. The evidenceQuotes MUST sound exactly like real Bangladeshi consumers. 
3. ALL numbers and text in the report MUST be generated dynamically based on the specific asset. If the asset is poor, the metrics should reflect that.

If the user is on the Free Tier (isFreeTier=${isFreeTier}), provide a high-level diagnostic.
If the user is on the Enterprise Tier (isFreeTier=${isFreeTier}), provide extremely detailed, culturally nuanced, and hyper-local feedback.
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
Ensure EVERYTHING is detailed, professional, and directly addresses the visual/audio elements in the uploaded asset. Do not use generic fallback texts.`;`"""

api_content = re.sub(r'const sysInstruct = `You are.*?uploaded asset\.`;', new_sys_instruct[20:-1], api_content, flags=re.DOTALL)

# Remove the strict response schema because generating such a massive schema using Type object would take 200 lines and is prone to errors.
# Gemini 2.5 Flash is good at adhering to JSON format from sysInstruct if we just specify responseMimeType: 'application/json'.
replace_config = """      config: {
        systemInstruction: sysInstruct,
        responseMimeType: 'application/json',
      }"""
api_content = re.sub(r'      config: \{\s*systemInstruction: sysInstruct,\s*responseMimeType: \'application/json\',\s*responseSchema: \{.*?\}\s*\}', replace_config, api_content, flags=re.DOTALL)


with open(api_file, 'w', encoding='utf-8') as f:
    f.write(api_content)
print("Updated API route")
