"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

interface WorkflowHeaderProps {
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  onNewWorkflow?: () => void;
  onFilter?: () => void;
  workflowId: string | null;
  isExecuting: boolean;
  isPending: boolean;
  onExecute: () => Promise<void>;
  onSave: () => void;
}

export default function WorkflowHeader({
  searchQuery,
  setSearchQuery,
  onNewWorkflow,
  onFilter,
  workflowId,
  isExecuting,
  isPending,
  onExecute,
  onSave
}: WorkflowHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search workflows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery?.(e.target.value)}
          className="w-[300px]"
        />
        <Button variant="outline" size="icon" onClick={onFilter}>
          <Filter className="h-4 w-4" />
        </Button>
        <Button 
          onClick={onExecute} 
          disabled={isExecuting || isPending || !workflowId}
        >
          {isExecuting ? "Executing..." : isPending ? "Pending..." : "Execute"}
        </Button>
        <Button onClick={onSave}>Save</Button>
      </div>
      <Button onClick={onNewWorkflow}>
        <Plus className="h-4 w-4 mr-2" />
        New Workflow
      </Button>
    </div>
  );
}