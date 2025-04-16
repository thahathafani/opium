import { saveProject } from "@/lib/saveProject";
import { loadProject } from "@/lib/loadProject";
import { FileNode } from "@/types";


// Use in UI button
export async function handleSave(prompt: string, response: string, files: FileNode[]) {
  const saved = await saveProject("My App", prompt, response, files);
  alert("Project saved!");
  return saved;
}

export async function handleLoad(projectId: string) {
  const project = await loadProject(projectId);
  return project;
}
