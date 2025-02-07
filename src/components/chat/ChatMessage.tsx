import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageWithMetadata extends Message {
  id: string;
  reactions: string[];
  attachments?: { name: string; url: string }[];
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}

interface ChatMessageProps {
  message: MessageWithMetadata;
  onDelete: (messageId: string) => void;
  onCopy: (content: string) => void;
  onReaction: (messageId: string, reaction: string) => void;
}

const ChatMessage = ({ message, onDelete, onCopy, onReaction }: ChatMessageProps) => {
  return (
    <div className="group relative w-full mb-4">
      <div className={cn(
        "flex w-full",
        message.role === 'user' ? "justify-end" : "justify-start"
      )}>
        <div
          className={cn(
            "break-words whitespace-pre-wrap rounded-xl px-4 py-2 text-sm relative max-w-[85%]",
            message.role === 'user'
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-gray-800"
          )}
          style={{
            fontWeight: message.formatting?.bold ? 'bold' : 'normal',
            fontStyle: message.formatting?.italic ? 'italic' : 'normal',
            textDecoration: message.formatting?.underline ? 'underline' : 'none'
          }}
        >
          {message.content}
          {message.attachments?.map((file, index) => (
            <div key={index} className="mt-2">
              <a 
                href={file.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <File className="h-4 w-4" />
                {file.name}
              </a>
            </div>
          ))}
          <div className={cn(
            "absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity",
            message.role === 'user' ? "-left-16" : "-right-16",
            "flex gap-1"
          )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-gray-100"
                  onClick={() => onCopy(message.content)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy message</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-gray-100"
                  onClick={() => onDelete(message.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete message</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={cn(
        "flex gap-1 mt-1",
        message.role === 'user' ? "justify-end" : "justify-start"
      )}>
        {['👍', '👎', '❤️', '😊'].map((reaction) => (
          <button
            key={reaction}
            onClick={() => onReaction(message.id, reaction)}
            className={cn(
              "p-1 rounded hover:bg-gray-100 transition-colors text-xs",
              message.reactions.includes(reaction) && "bg-gray-100"
            )}
          >
            {reaction}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;