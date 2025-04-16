"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import { buildFileTree, FileNode } from "@/lib/fileTree";
import FileExplorer from "@/components/FileExplorer";
import PreviewFrame from "@/components/PreviewFrame";
import { generateHTML } from "@/lib/renderHTML";
import PromptChatThread from "@/components/PromptChatThread";
import { getGeminiResponse } from "@/lib/gemini";
import { parseLLMResponseToFiles } from "@/lib/parser";


const PromptChatInput = dynamic(() => import("../components/PromptChatInput"), {
  ssr: false,
});

// 🧠 Dummy file list
const dummyFiles = [
  {
    path: "app/page.tsx",
    content: `export default function Page() {
      return (<div>Hello from Preview Frame</div>);
    }`,
  },
  {
    path: "components/Button.tsx",
    content: "export const Button = () => <button>Click</button>;",
  },
];

// 🧠 Detect language from file extension
function getLanguageFromPath(path: string): string {
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return "typescript";
  if (path.endsWith(".js")) return "javascript";
  if (path.endsWith(".css")) return "css";
  if (path.endsWith(".html")) return "html";
  if (path.endsWith(".json")) return "json";
  return "plaintext";
}

export default function HomePage() {
  const [files, setFiles] = useState(dummyFiles);
  const [selected, setSelected] = useState<FileNode | null>(null);
  const [html, setHtml] = useState(generateHTML(files));
  const tree = buildFileTree(files);
  const [chats, setChats] = useState<{ text: string; response?: string }[]>([]);


  // 🧠 Manual regenerate button
  const handleRegenerate = () => {
    setHtml(generateHTML(files));
  };

  // 🧠 Auto update preview after file edit (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHtml(generateHTML(files));
    }, 800);
    return () => clearTimeout(timeout);
  }, [files]);

  // 🧠 When code changes, update the correct file
  const handleCodeChange = (newCode: string | undefined) => {
    if (!selected || !newCode) return;

    const updatedFiles = files.map((f) =>
      f.path === selected.path ? { ...f, content: newCode } : f
    );

    setFiles(updatedFiles);
  };



  // chat
  const handlePromptSend = async (text: string) => {
  setChats((prev) => [...prev, { text }]);

  const response = await getGeminiResponse(text);

  setChats((prev) =>
    prev.map((chat, idx) =>
      idx === prev.length - 1 ? { ...chat, response } : chat
    )
  );

  const generatedFiles = parseLLMResponseToFiles(response);
  setFiles((prev) => [...prev, ...generatedFiles]);
  };

  

  return (
    <>
      {/* Chat UI */}
      <PromptChatInput onSend={handlePromptSend} />
      <PromptChatThread chats={chats} />
  
      <div className="flex h-screen">
        {/* Sidebar: File explorer */}
        <div className="w-64">
          <FileExplorer tree={tree} onFileSelect={setSelected} />
        </div>
  
        {/* Main Area */}
        <div className="flex-1 grid grid-cols-2 gap-2 p-2">
          {/* Code Editor panel */}
          <div className="bg-zinc-100 p-2 rounded shadow h-screen">
            <button
              onClick={handleRegenerate}
              className="text-xs bg-black text-white px-3 py-1 rounded mb-2"
            >
              Regenerate Preview
            </button>
  
            <h2 className="text-sm font-semibold mb-1">{selected?.name}</h2>
  
            {selected ? (
              <CodeEditor
                code={files.find((f) => f.path === selected.path)?.content || ""}
                onChange={handleCodeChange}
                language={getLanguageFromPath(selected.path)}
              />
            ) : (
              <p className="text-xs">Click a file to edit it.</p>
            )}
          </div>
  
          {/* Preview Frame */}
          <div className="bg-white border rounded overflow-hidden">
            <PreviewFrame html={html} />
          </div>
        </div>
      </div>
    </>
  );
}
