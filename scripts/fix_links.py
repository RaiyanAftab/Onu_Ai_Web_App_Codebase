import os
import re

files_to_fix = [
    'src/app/page.tsx',
    'src/app/enterprise/page.tsx',
    'src/app/pricing/page.tsx',
    'src/app/workspace/page.tsx'
]

def replace_links(content):
    if "import Link from 'next/link';" not in content:
        content = content.replace("import { useRouter", "import Link from 'next/link';\nimport { useRouter")
    
    # We will find all router.push and replace the button tag manually
    def replacer(match):
        push_arg = match.group(1).strip()
        # push_arg could be '/workspace' or '/workspace?tier=free'
        # we will replace `onClick={() => router.push(push_arg)}` with `href={push_arg}`
        return match.group(0).replace(f"onClick={{() => router.push({push_arg})}}", f"href={push_arg}").replace("<button", "<Link").replace("</button>", "</Link>")

    # match <button ... onClick={() => router.push(...)} ... > ... </button>
    content = re.sub(r'<button[^>]*onClick=\{\(\)\s*=>\s*router\.push\(([^)]+)\)\}[^>]*>[\s\S]*?</button>', replacer, content)
    return content

for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = replace_links(content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Links fixed.")
