"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const ChatWithNoSSR = dynamic(() => import('./SalesChat'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

const ChatPageClient = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto flex flex-col min-h-[80vh]">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl font-bold text-foreground">Sales Chat</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered chat interface for managing sales conversations.
          </p>
        </div>
        <Suspense fallback={
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }>
          <ChatWithNoSSR fullPage={true} />
        </Suspense>
      </div>
    </div>
  );
};

export default ChatPageClient; 