import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { RefObject } from "react";
import { MessageWithMetadata } from "@/types/chat";

interface ChatMessageListProps {
  messages: MessageWithMetadata[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
  onDelete: (messageId: string) => void;
  onCopy: (content: string) => void;
  onReaction: (messageId: string, reaction: string) => void;
}

const ChatMessageList = ({
  messages,
  isLoading,
  messagesEndRef,
  onDelete,
  onCopy,
  onReaction,
}: ChatMessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onDelete={() => onDelete(message.id)}
            onCopy={() => onCopy(message.content)}
            onReaction={(reaction) => onReaction(message.id, reaction)}
          />
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;