"use client";

import { useChat } from "@/hooks/useChat";
import ChatInterface from "./ChatInterface";
import { useRef } from "react";

interface SalesChatProps {
  fullPage?: boolean;
}

const SalesChat = ({ fullPage = false }: SalesChatProps) => {
  const chatProps = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Ensure we have default values for all properties
  const safeProps = {
    messages: chatProps?.messages || [],
    input: chatProps?.input || "",
    setInput: chatProps?.setInput || (() => {}),
    isLoading: chatProps?.isLoading || false,
    formatting: chatProps?.formatting || { bold: false, italic: false, underline: false },
    setFormatting: chatProps?.setFormatting || (() => {}),
    fileInputRef,
    messagesEndRef,
    handleSend: chatProps?.handleSend || (() => {}),
    handleReaction: chatProps?.handleReaction || (() => {}),
    clearHistory: chatProps?.clearHistory || (() => {}),
    handleFileUpload: chatProps?.handleFileUpload || (() => {}),
    deleteMessage: chatProps?.deleteMessage || (() => {}),
    copyMessage: chatProps?.copyMessage || (() => {})
  };

  return (
    <div className={fullPage ? 'h-full' : 'h-[600px]'}>
      <ChatInterface {...safeProps} />
    </div>
  );
};

export default SalesChat;