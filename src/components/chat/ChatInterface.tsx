import React, { useRef } from 'react';
import { Message } from '@/types/chat';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  handleFileUpload: () => void;
  formatting: any;
  setFormatting: React.Dispatch<React.SetStateAction<any>>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  deleteMessage: (messageId: string) => void;
  copyMessage: (messageId: string) => void;
  handleReaction: (messageId: string, reaction: string) => void;
}
const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  handleFileUpload,
  formatting,
  setFormatting,
  messagesEndRef,
  deleteMessage,
  copyMessage,
  handleReaction
}) => {
  // Correctly type the ref to be strictly HTMLInputElement
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = React.useState('');
  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          onDelete={deleteMessage}
          onCopy={copyMessage}
          onReaction={handleReaction}
        />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isLoading={isLoading}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            formatting={formatting}
            setFormatting={setFormatting}
          />
        </div>
      </div>
    </div>
  );
};
export default ChatInterface;