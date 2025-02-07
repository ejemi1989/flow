"use client";

import { Button } from "@/components/backend/ui/button";
import { Bell, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const router = useRouter();

  const handleCreateWorkflow = () => {
    console.log("Navigating to workflows page");
    router.push("/dashboard/workflows");
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Welcome back! Here&apos;s your sales overview.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
              3
            </span>
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleCreateWorkflow}
          >
            Create Workflow
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;