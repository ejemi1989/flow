"use client";

import '@/styles/index.css';
import { Button } from "@/components/backend/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, GitBranch, Users, MessageSquare, BookOpen,Settings } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const pathname = usePathname();

  const navItems = [
    { path: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { path: "/dashboard/workflows", icon: GitBranch, label: "Workflow" },
    { path: "/dashboard/documentations", icon: BookOpen, label: "Documentations" },
    { path: "/dashboard/contacts", icon: Users, label: "Contact" },
    { path: "/dashboard/chat", icon: MessageSquare, label: "Chat" },
  ];

  const isActiveRoute = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-600">SalesAI</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActiveRoute(item.path)
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <Link href="/dashboard/settings">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="pl-64">
        <main className="min-h-screen bg-gray-50/50 p-8 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;