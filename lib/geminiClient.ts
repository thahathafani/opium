import { engineerPrompt } from "@/lib/promptEngineer";

export async function generateProject(rawPrompt: string) {
  const engineered = engineerPrompt(rawPrompt);

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawPrompt, engineered }),
  });

  if (!res.ok) throw new Error("Failed to generate project");
}