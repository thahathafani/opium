// components/FileExplorer.tsx

"use client";

import { useState } from "react";
import { FileNode } from "@/lib/fileTree";
import { FileText, Folder, FolderOpen } from "lucide-react";

type Props = {
  tree: FileNode[];
  onFileSelect: (file: FileNode) => void;
};

export default function FileExplorer({ tree, onFileSelect }: Props) {
  return (
    <div className="w-64 bg-zinc-900 text-white h-full p-2 overflow-auto">
      <TreeNodeList nodes={tree} onFileSelect={onFileSelect} />
    </div>
  );
}

function TreeNodeList({
  nodes,
  onFileSelect,
}: {
  nodes: FileNode[];
  onFileSelect: (file: FileNode) => void;
}) {
  return (
    <>
      {nodes.map((node) => (
        <TreeNode key={node.path} node={node} onFileSelect={onFileSelect} />
      ))}
    </>
  );
}

function TreeNode({
  node,
  onFileSelect,
}: {
  node: FileNode;
  onFileSelect: (file: FileNode) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (node.type === "file") onFileSelect(node);
    else setOpen(!open);
  };

  return (
    <div className="ml-2">
      <div
        onClick={handleClick}
        className="cursor-pointer flex items-center space-x-1 hover:bg-zinc-800 p-1 rounded"
      >
        {node.type === "file" ? (
          <FileText size={14} />
        ) : open ? (
          <FolderOpen size={14} />
        ) : (
          <Folder size={14} />
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {node.type === "folder" && open && node.children && (
        <TreeNodeList nodes={node.children} onFileSelect={onFileSelect} />
      )}
    </div>
  );
}
