// components/PromptChatThread.tsx
export default function PromptChatThread({ chats }: { chats: { text: string; response?: string }[] }) {
    return (
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] h-30 overflow-y-auto p-4 bg-black shadow-lg rounded-xl z-40">
        {chats.map((chat, i) => (
          <div key={i} className="mb-3">
            <p className="text-sm font-medium text-blue-600">You: {chat.text}</p>
            {chat.response && (
              <pre className="text-xs bg-gray-100 mt-1 p-2 rounded max-h-32 overflow-auto whitespace-pre-wrap">
                {chat.response}
              </pre>
            )}
          </div>
        ))}
      </div>
    );
  }
  