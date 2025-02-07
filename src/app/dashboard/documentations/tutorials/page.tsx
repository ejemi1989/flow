"use client";

import { Card } from "@/components/backend/ui/card";
import Link from "next/link";

const Tutorials = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/dashboard/documentations" className="text-blue-500 hover:underline">← Back to Documentation</Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Video Tutorials</h1>
        <p className="text-gray-600">Step-by-step video guides for workflow automation</p>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Getting Started Series</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/placeholder1"
                    title="Getting Started with Workflows"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-medium">Introduction to Workflows</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Basic concepts overview</li>
                  <li>Creating your first workflow</li>
                  <li>Understanding node types</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/placeholder2"
                    title="Advanced Workflow Techniques"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-medium">Advanced Techniques</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Complex workflow patterns</li>
                  <li>Error handling strategies</li>
                  <li>Performance optimization</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-medium mb-3">Workflow Design Principles</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Keep workflows focused and modular</li>
                  <li>Implement proper error handling</li>
                  <li>Use clear naming conventions</li>
                  <li>Document your workflows</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-medium mb-3">Testing and Deployment</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Test workflows in isolation</li>
                  <li>Validate all possible paths</li>
                  <li>Monitor workflow performance</li>
                  <li>Plan for scalability</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Tutorials;