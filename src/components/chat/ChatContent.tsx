import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { MessageWithMetadata } from "@/types/chat";
import { RefObject } from "react";

interface ChatContentProps {
  messages: MessageWithMetadata[];
  input: string;
  setInput: (value: string) => void;
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  setFormatting: (value: any) => void;
  isLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  messagesEndRef: RefObject<HTMLDivElement>;
  handleSend: () => void;
  handleFileUpload: () => void;
  clearHistory: () => void;
  deleteMessage: (messageId: string) => void;
  copyMessage: (content: string) => void;
  onReaction: (messageId: string, reaction: string) => void;
  onQuoteGenerated: (quoteText: string) => void;
  onMeetingScheduled: (meetingDetails: string) => void;
}

const ChatContent = ({
  messages,
  input,
  setInput,
  formatting,
  setFormatting,
  isLoading,
  fileInputRef,
  messagesEndRef,
  handleSend,
  handleFileUpload,
  clearHistory,
  deleteMessage,
  copyMessage,
  onReaction,
  onQuoteGenerated,
  onMeetingScheduled,
}: ChatContentProps) => {
  return (
    <div className="flex flex-col h-full bg-background rounded-lg shadow-sm">
      <ChatHeader
        onQuoteGenerated={onQuoteGenerated}
        onMeetingScheduled={onMeetingScheduled}
        clearHistory={clearHistory}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col px-4 overflow-hidden">
          <ChatMessageList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
            onDelete={deleteMessage}
            onCopy={copyMessage}
            onReaction={onReaction}
          />

          <div className="py-4">
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
    </div>
  );
};

export default ChatContent;