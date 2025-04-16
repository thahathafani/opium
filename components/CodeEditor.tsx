// === components/CodeEditor.tsx ===
"use client";
import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  onChange: (value: string | undefined) => void;
  language?: string;
};

export default function CodeEditor({ code, onChange, language = "typescript" }: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={code}
      onChange={onChange}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
}