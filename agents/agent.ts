// agent/agent.ts
import { rewritePrompt } from './promptRewriter';
import { detectIntent } from './intentDetector';
import { buildContext } from './contextBuilder';
import { getLLMResponse } from './llmConnector';
import { parseAndWriteFiles } from './fileWriter';

export async function handleUserPrompt(prompt: string) {
  const intent = detectIntent(prompt);
  const rewritten = rewritePrompt(prompt);
  const context = buildContext('./');

  const fullPrompt = `${rewritten}\n\nContext:\n${context}`;
  const llmOutput = await getLLMResponse(fullPrompt);

  if (intent === 'build_project' || intent === 'edit_file') {
    parseAndWriteFiles(llmOutput);
  }

  return llmOutput;
}