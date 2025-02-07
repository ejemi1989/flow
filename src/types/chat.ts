export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export interface MessageWithMetadata {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reactions: string[];
  attachments?: Array<{ name: string; url: string; }>;
  formatting?: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
}