"use client";

import { ScrollArea } from "@/components/backend/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/backend/ui/tabs";
import { Card } from "@/components/backend/ui/card";
import { GitBranch, Book, FileText, Workflow } from "lucide-react";
import Link from "next/link";

const Documentations = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Workflow Documentation</h1>
        <p className="text-gray-600">Learn how to create and manage workflows effectively</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/dashboard/documentations/started" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Book className="w-5 h-5 text-blue-500" />
              Getting Started
            </h2>
            <p className="text-gray-600">Learn the basics of workflow automation and core concepts</p>
          </Card>
        </Link>

        <Link href="/dashboard/documentations/nodes" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-green-500" />
              Node Types
            </h2>
            <p className="text-gray-600">Explore all available node types and their functionalities</p>
          </Card>
        </Link>

        <Link href="/dashboard/documentations/templates" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Templates
            </h2>
            <p className="text-gray-600">Browse and learn how to use pre-built workflow templates</p>
          </Card>
        </Link>

        <Link href="/dashboard/documentations/tutorials" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-orange-500" />
              Video Tutorials
            </h2>
            <p className="text-gray-600">Watch step-by-step guides and best practices</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Documentations;