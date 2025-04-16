// lib/fileTree.ts

export type FileNode = {
    name: string;
    path: string;
    type: "file" | "folder";
    children?: FileNode[];
    content?: string;
  };
  
  export function buildFileTree(files: { path: string; content: string }[]): FileNode[] {
    const root: FileNode[] = [];
  
    for (const file of files) {
      const parts = file.path.split("/");
      let current = root;
  
      for (let i = 0; i < parts.length; i++) {
        const name = parts[i];
        const isFile = i === parts.length - 1;
        const existing = current.find(node => node.name === name);
  
        if (existing) {
          current = existing.children!;
        } else {
          const newNode: FileNode = {
            name,
            path: parts.slice(0, i + 1).join("/"),
            type: isFile ? "file" : "folder",
            ...(isFile ? { content: file.content } : { children: [] })
          };
          current.push(newNode);
          if (!isFile) {
            current = newNode.children!;
          }
        }
      }
    }
  
    return root;
  }
  