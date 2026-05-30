import os
import re

replacements = {
    r"Orchestration layer": "Testing engine",
    r"orchestration layer": "testing engine",
    r"Cognitive Swarm": "AI Audience Panel",
    r"cognitive swarm": "AI audience panel",
    r"COGNITIVE SWARM": "AI AUDIENCE PANEL",
    r"Cognitive nodes": "Audience profiles",
    r"cognitive nodes": "audience profiles",
    r"COGNITIVE NODES": "AUDIENCE PROFILES",
    r"Haversine Decay Algorithm": "Location accuracy score",
    r"HAVERSINE DECAY ALGORITHM": "LOCATION ACCURACY SCORE",
    r"Ingesting RAG Baseline": "Reading your campaign history",
    r"INGESTING RAG BASELINE": "READING YOUR CAMPAIGN HISTORY",
    r"Demographic friction points": "Audience disconnect risks",
    r"demographic friction points": "audience disconnect risks",
    r"Haversine Radar": "Regional reach score",
    r"HAVERSINE RADAR": "REGIONAL REACH SCORE",
    r"Historical ROI RAG": "Campaign performance library",
    r"HISTORICAL ROI RAG": "CAMPAIGN PERFORMANCE LIBRARY",
    r"PR Crisis Sandbox": "Public reaction test",
    r"PR CRISIS SANDBOX": "PUBLIC REACTION TEST",
    r"Adversarial attack vectors": "Backlash scenarios",
    r"adversarial attack vectors": "backlash scenarios",
    r"Tier-1 ISP Hubs": "Major internet centres",
    r"Tier-1 Telecom Hubs": "Major internet centres",
    r"Latent cultural friction": "Cultural blind spots",
    r"latent cultural friction": "cultural blind spots",
    r"Node Hours": "Test credits",
    r"Node-Hours": "Test-Credits",
    r"Cognitive Compute Architecture": "Scale as you grow",
    r"Semantic Quality": "Writing quality score",
    r"Information Retention": "Message recall rate",
    r"ROAS lift": "Projected return on ad spend",
    r"Semantic Copy Sculpting": "AI powered ad copy testing"
}

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for pattern, repl in replacements.items():
        new_content = re.sub(pattern, repl, new_content)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

