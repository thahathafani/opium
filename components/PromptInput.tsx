'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateProject } from "@/lib/geminiClient";

export default function PromptInput() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    await generateProject(idea);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Describe your web app idea</h1>
      <Textarea
        rows={6}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Example: I want a note-taking app with login, markdown editor, and tagging..."
        className="text-black"
      />
      <Button onClick={handleGenerate} className="mt-4" disabled={loading}>
        {loading ? "Generating..." : "Generate App"}
      </Button>
    </div>
  );
}
