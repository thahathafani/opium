import { FileNode } from "@/types";

export function parseLLMResponseToFiles(response: string): FileNode[] {
  const lines = response.split("\n");
  const files: FileNode[] = [];

  let currentPath = "";
  let buffer: string[] = [];

  const pushFile = () => {
    if (!currentPath || buffer.length === 0) return;

    const content = buffer.join("\n").trim();
    const name = currentPath.split("/").pop()!;
    const folder = currentPath.replace(`/${name}`, "");

    files.push({ name, path: currentPath, folder, content });
    buffer = [];
  };

  for (const line of lines) {
    const match = line.match(/^\/(.+?\.\w+):$/);
    if (match) {
      pushFile();
      currentPath = `/${match[1]}`;
    } else {
      buffer.push(line);
    }
  }

  pushFile(); // Push the last file
  return files;
}
