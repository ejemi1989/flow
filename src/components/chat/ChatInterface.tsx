import React from 'react';
import { MessageWithMetadata } from '@/types/chat';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';

interface ChatInterfaceProps {
  messages: MessageWithMetadata[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  handleFileUpload: (file: File | null) => void;
  input: string;
  setInput: (value: string) => void;
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  setFormatting: (value: { bold: boolean; italic: boolean; underline: boolean }) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onDelete: (id: string) => void;
  onCopy: (content: string) => void;
  onReaction: (id: string, reaction: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  handleFileUpload,
  input,
  setInput,
  formatting,
  setFormatting,
  fileInputRef,
  messagesEndRef,
  onDelete,
  onCopy,
  onReaction,
}) => {
  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput(''); // Clear input after sending
    }
  };

  return (
    <div className="flex flex-col h-full font-sans">
      <div className="flex-1 overflow-y-auto">
        <ChatMessageList 
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          onDelete={onDelete}
          onCopy={onCopy}
          onReaction={onReaction}
        />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <ChatInput
            input={input}
            setInput={setInput}
            formatting={formatting}
            setFormatting={setFormatting}
            handleSend={handleSend}
            isLoading={isLoading}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
