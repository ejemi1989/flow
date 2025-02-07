"use client";

import { MessageWithMetadata } from "@/types/chat";
import { RefObject } from "react";
import { Bold, Italic, Underline, X, Copy } from "lucide-react";
import { Button } from "@/components/backend/ui/button";

interface ChatInterfaceProps {
  messages: MessageWithMetadata[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  setFormatting: (value: { bold: boolean; italic: boolean; underline: boolean; }) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  handleSend: () => void;
  handleReaction: (messageId: string, reaction: string) => void;
  clearHistory: () => void;
  handleFileUpload: () => void;
  deleteMessage: (messageId: string) => void;
  copyMessage: (content: string) => void;
}

const ChatInterface = ({
  messages = [],
  input = "",
  setInput,
  isLoading = false,
  formatting = { bold: false, italic: false, underline: false },
  setFormatting,
  fileInputRef,
  messagesEndRef,
  handleSend,
  handleReaction,
  clearHistory,
  handleFileUpload,
  deleteMessage,
  copyMessage
}: ChatInterfaceProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto flex flex-col min-h-[80vh]">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl font-bold text-foreground">Sales Chat</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered chat interface for managing sales conversations.
          </p>
          <Button variant="outline" onClick={clearHistory}>
            Clear History
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-4 relative group ${
                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {message.content}
                <div className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                  <button onClick={() => copyMessage(message.content)}>
                    <Copy className="h-4 w-4" />
                  </button>
                  <button onClick={() => deleteMessage(message.id)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  {['👍', '❤️', '😊'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(message.id, emoji)}
                      className={`p-1 rounded hover:bg-gray-100 ${
                        message.reactions.includes(emoji) ? 'bg-gray-100' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFormatting({ ...formatting, bold: !formatting.bold })}
              className={formatting.bold ? "bg-primary text-primary-foreground" : ""}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFormatting({ ...formatting, italic: !formatting.italic })}
              className={formatting.italic ? "bg-primary text-primary-foreground" : ""}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFormatting({ ...formatting, underline: !formatting.underline })}
              className={formatting.underline ? "bg-primary text-primary-foreground" : ""}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border p-2"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 