// agent/contextBuilder.ts
import fs from 'fs';
import path from 'path';

export function buildContext(projectRoot: string): string {
  const walk = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.flatMap((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? walk(res) : [res];
    });
  };

  const files = walk(projectRoot);
  return files.map((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    return `--- FILE: ${file.replace(projectRoot + '/', '')} ---\n${content}`;
  }).join('\n\n');
}