"use client";

import { Card } from "@/components/backend/ui/card";
import { GitBranch, Workflow, FileText } from "lucide-react";
import Link from "next/link";

const Started = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/dashboard/documentations" className="text-blue-500 hover:underline">← Back to Documentation</Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Getting Started with Workflows</h1>
        <p className="text-gray-600">Learn how to create and manage workflows effectively</p>
      </div>

      <Card className="p-6">
        <div className="prose max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is a Workflow?</h2>
            <p className="text-gray-600 mb-4">
              A workflow is a series of automated steps that help you streamline your business processes. 
              Each workflow consists of nodes connected together to create a flow of actions.
            </p>
            <img 
              src="/workflow-diagram.png" 
              alt="Workflow Diagram" 
              className="rounded-lg border border-gray-200 mb-4"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Basic Concepts</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <GitBranch className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium">Nodes</h4>
                  <p className="text-gray-600">Building blocks that represent different actions or conditions in your workflow. Each node performs a specific task in your automation process.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Workflow className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium">Connections</h4>
                  <p className="text-gray-600">Links between nodes that determine the flow of execution. These connections define how data and control flow through your workflow.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium">Templates</h4>
                  <p className="text-gray-600">Pre-built workflows for common scenarios that you can customize to match your specific needs.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Creating Your First Workflow</h3>
            <p className="text-gray-600 mb-4">
              To create your first workflow, follow these steps:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Navigate to the Workflows section in the dashboard</li>
              <li>Click on "Create New Workflow"</li>
              <li>Choose a template or start from scratch</li>
              <li>Add and connect nodes to build your automation</li>
              <li>Configure each node's settings</li>
              <li>Test and activate your workflow</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Started;