import { supabase } from "./supabase";
import { FileNode } from "@/types";

export async function loadProject(id: string): Promise<{
  prompt: string;
  response: string;
  files: FileNode[];
}> {
  const { data: project, error } = await supabase
    .from("projects")
    .select()
    .eq("id", id)
    .single();

  if (error || !project) throw new Error("Project not found");

  const { data: files } = await supabase
    .from("files")
    .select()
    .eq("project_id", id);

  return {
    prompt: project.prompt,
    response: project.response,
    files: files || [],
  };
}
