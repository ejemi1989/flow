"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageWithMetadata } from "@/types/chat";
import { generateAIResponse } from "@/utils/aiChat";
import { toast } from "sonner";

export const useChat = () => {
  const [messages, setMessages] = useState<MessageWithMetadata[]>(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formatting, setFormatting] = useState({ bold: false, italic: false, underline: false });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() && !fileInputRef.current?.files?.length) return;

    const attachments = fileInputRef.current?.files ? 
      Array.from(fileInputRef.current.files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      })) : [];

    const userMessage: MessageWithMetadata = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      reactions: [],
      attachments,
      formatting: { ...formatting }
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    if (fileInputRef.current) fileInputRef.current.value = '';

    try {
      const aiResponse = await generateAIResponse([...messages, userMessage]);
      const assistantMessage: MessageWithMetadata = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        reactions: []
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error("Failed to generate AI response");
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions.includes(reaction)
          ? msg.reactions.filter(r => r !== reaction)
          : [...msg.reactions, reaction];
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    toast.success("Chat history cleared");
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    toast.success("Message deleted");
  };

  const copyMessage = (content: string) => {
    try {
      navigator.clipboard.writeText(content);
      toast.success("Message copied to clipboard");
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error("Copy to clipboard not supported in this browser");
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    formatting,
    setFormatting,
    fileInputRef,
    messagesEndRef,
    handleSend,
    handleReaction,
    clearHistory,
    handleFileUpload,
    deleteMessage,
    copyMessage
  };
};