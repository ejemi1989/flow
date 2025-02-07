"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavigationItem {
  title: string;
  href: string;
}

interface NavigationCategory {
  title: string;
  items: NavigationItem[];
}

const defaultNavigation: NavigationCategory[] = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Workflows", href: "/dashboard/workflows" },
      { title: "Contacts", href: "/dashboard/contacts" },
      { title: "Chat", href: "/dashboard/chat" },
    ]
  },
  {
    title: "Settings",
    items: [
      { title: "Profile", href: "/dashboard/settings/profile" },
      { title: "Preferences", href: "/dashboard/settings/preferences" },
    ]
  }
];

export default function NavigationMenu() {
  const pathname = usePathname();
  const navigation = defaultNavigation;

  return (
    <nav className="space-y-6">
      {Array.isArray(navigation) && navigation.map((category) => {
        if (!category || !Array.isArray(category.items)) return null;
        
        return (
          <div key={category.title} className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              {category.title}
            </h2>
            <div className="space-y-1">
              {category.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
} 