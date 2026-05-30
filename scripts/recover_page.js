const fs = require('fs');

const transcriptPath = '/Users/raiyanaftab/.gemini/antigravity/brain/7518e8c5-557b-48e7-a7ac-6a97f880e076/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

let fileContent = '';

for (const line of lines) {
  try {
    const entry = JSON.parse(line);
    if (!entry.tool_calls) continue;

    for (const call of entry.tool_calls) {
      if (call.name === 'write_to_file' && call.args.TargetFile.endsWith('page.tsx')) {
        fileContent = call.args.CodeContent;
      }
      
      if (call.name === 'replace_file_content' && call.args.TargetFile.endsWith('page.tsx')) {
        const target = call.args.TargetContent;
        const repl = call.args.ReplacementContent;
        if (fileContent.includes(target)) {
          fileContent = fileContent.replace(target, repl);
        }
      }
      
      if (call.name === 'multi_replace_file_content' && call.args.TargetFile.endsWith('page.tsx')) {
        // Skip the bad one! We know the bad one had "Added reportData state" in Description.
        if (call.args.Description && call.args.Description.includes('Added reportData state')) {
          console.log('Skipping the bad multi_replace_file_content!');
          continue;
        }
        for (const chunk of call.args.ReplacementChunks) {
          const target = chunk.TargetContent;
          const repl = chunk.ReplacementContent;
          if (fileContent.includes(target)) {
            fileContent = fileContent.replace(target, repl);
          }
        }
      }
    }
  } catch (e) {}
}

fs.writeFileSync('/Users/raiyanaftab/.gemini/antigravity/scratch/onu-ai/src/app/workspace/page.tsx', fileContent);
console.log('Recovery complete. File size:', fileContent.length);
