// agent/promptRewriter.ts
export function rewritePrompt(rawPrompt: string): string {
    // You can add advanced NLP rewriting later
    return `You are a senior software engineer. The user asked:
  "${rawPrompt}". Write code in modular files with correct file extensions and folder structure. Avoid monolithic code blocks.`;
  }