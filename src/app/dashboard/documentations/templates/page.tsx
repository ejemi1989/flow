"use client";

import { Card } from "@/components/backend/ui/card";
import Link from "next/link";
import type { FC } from 'react';

const Templates: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/dashboard/documentations" className="text-blue-500 hover:underline">← Back to Documentation</Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Workflow Templates</h1>
        <p className="text-gray-600">Detailed guide to using and customizing workflow templates</p>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Lead Generation Template</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src="/lead-template.png" 
                  alt="Lead Generation Template" 
                  className="rounded-lg border border-gray-200 mb-4"
                />
                <h3 className="text-xl font-medium mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Automated lead capture</li>
                  <li>Lead scoring system</li>
                  <li>Email notification system</li>
                  <li>CRM integration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Implementation Guide</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Import the template</li>
                  <li>Configure lead capture form</li>
                  <li>Set up scoring criteria</li>
                  <li>Connect to your CRM</li>
                  <li>Test the workflow</li>
                </ol>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Email Campaign Template</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src="/email-template.png" 
                  alt="Email Campaign Template" 
                  className="rounded-lg border border-gray-200 mb-4"
                />
                <h3 className="text-xl font-medium mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Email sequence automation</li>
                  <li>A/B testing capability</li>
                  <li>Engagement tracking</li>
                  <li>Dynamic content insertion</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Implementation Guide</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Select campaign type</li>
                  <li>Set up email sequences</li>
                  <li>Configure tracking</li>
                  <li>Define success metrics</li>
                  <li>Launch campaign</li>
                </ol>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Templates;