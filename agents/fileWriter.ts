// agent/fileWriter.ts
import fs from 'fs';
import path from 'path';

export function parseAndWriteFiles(agentResponse: string, baseDir = './'): void {
  const files = agentResponse.split(/--- FILE: (.+?) ---/g).filter(Boolean);

  for (let i = 0; i < files.length; i += 2) {
    const filePath = path.join(baseDir, files[i].trim());
    const content = files[i + 1];
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content.trim());
  }
}