import os
import re

replacements = {
    r"1,500-node": "1,500-profile",
    r"1,500 nodes": "1,500 consumer profiles",
    r"1,500 AUTONOMOUS NODES": "1,500 CONSUMER PROFILES",
    r"1,500 personas": "1,500 consumer profiles",
    r"1,500 active simulated personas": "1,500 active consumer profiles",
    r"1,500 active audience profiles": "1,500 active consumer profiles"
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

# Also process markdown files
for md_file in ["NEURAL_NODE_ARCHITECTURE.md", "README.md", "PITCH_DECK.md"]:
    if os.path.exists(md_file):
        process_file(md_file)
