import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import { RefObject } from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  setFormatting: (value: any) => void;
  handleSend: () => void;
  isLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileUpload: () => void;
}

const ChatInput = ({
  input,
  setInput,
  handleSend,
  isLoading,
  fileInputRef,
  handleFileUpload,
}: ChatInputProps) => {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
        />
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={handleFileUpload}
          className="hover:bg-gray-100"
        >
          <Paperclip className="h-5 w-5 text-gray-500" />
        </Button>
        <Button 
          size="icon" 
          onClick={handleSend} 
          disabled={isLoading}
          className="rounded-full bg-primary hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;