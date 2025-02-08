import React from 'react';
import { MessageWithMetadata } from '@/types/chat';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';
import { Node, useNodesState } from '@xyflow/react';
import { NodeData } from '@/types/flow';

interface ChatInterfaceProps {
  messages: MessageWithMetadata[];
  onSendMessage: () => void;
  isLoading: boolean;
  handleFileUpload: () => void;
  input: string;
  setInput: (value: string) => void;
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  setFormatting: (value: any) => void;
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
  onReaction
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4">
        <ChatMessageList 
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          onDelete={onDelete}
          onCopy={onCopy}
          onReaction={onReaction}
        />
      </div>
      
      <div className="p-4 mt-auto border-t bg-white">
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
  );
};

export default ChatInterface;