import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from "@/lib";
import { base, heading } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { subheading } from "@/constants/fonts";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sales Dashboard',
    description: 'AI-powered sales automation platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background antialiased font-heading",
                base.variable,
                heading.variable,
                subheading.variable,
                inter.className
            )}>
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    );
}
