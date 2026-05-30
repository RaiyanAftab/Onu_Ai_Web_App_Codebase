with open('src/app/workspace/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('accept="image/*"', 'accept="image/*,video/mp4,video/webm,video/quicktime"')

with open('src/app/workspace/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("File input updated.")
