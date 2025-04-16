// components/PromptChatInput.tsx

"use client"

import { useState } from "react";

export default function PromptChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t z-50">
      <div className="max-w-2xl mx-auto flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
          placeholder="Ask Gemini to generate a component..."
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 text-sm rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
