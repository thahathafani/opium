import { supabase } from "./supabase";
import { FileNode } from "@/types";

export async function saveProject(
  title: string,
  prompt: string,
  response: string,
  files: FileNode[]
) {
  const { data: project, error } = await supabase
    .from("projects")
    .insert([{ title, prompt, response }])
    .select()
    .single();

  if (error || !project) throw new Error("Failed to save project");

  const filesWithProject = files.map((f) => ({
    ...f,
    project_id: project.id,
  }));

  const { error: fileError } = await supabase.from("files").insert(filesWithProject);
  if (fileError) throw new Error("Failed to save files");

  return project;
}
