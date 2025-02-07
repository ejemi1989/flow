"use client";

import { ScrollArea } from "@/components/backend/ui/scroll-area";
import { Card } from "@/components/backend/ui/card";
import Link from "next/link";
import { nodeCategories } from "@/config/nodeCategories";
import type { FC } from 'react';

const Nodes: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/dashboard/documentations" className="text-blue-500 hover:underline">← Back to Documentation</Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Node Types Documentation</h1>
        <p className="text-gray-600">Complete guide to all available node types and their usage</p>
      </div>

      <Card className="p-6">
        <ScrollArea className="h-[600px]">
          <div className="space-y-12">
            {nodeCategories.map((category) => (
              <section key={category.title} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item) => (
                    <div key={item.type} className="p-6 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{item.label}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Common Use Cases:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          <li>Automation workflows</li>
                          <li>Data processing</li>
                          <li>Integration tasks</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Nodes;