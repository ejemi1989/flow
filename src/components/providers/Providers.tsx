"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </QueryClientProvider>
        </Provider>
    );
} 