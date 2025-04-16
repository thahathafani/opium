// agent/intentDetector.ts
export type Intent = 'build_project' | 'edit_file' | 'generate_snippet' | 'unknown';

export function detectIntent(prompt: string): Intent {
  if (/create|build|generate.*(app|project)/i.test(prompt)) return 'build_project';
  if (/edit|modify|update.*file/i.test(prompt)) return 'edit_file';
  if (/snippet|example|sample/i.test(prompt)) return 'generate_snippet';
  return 'unknown';
}