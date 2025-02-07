"use client";

import { useState } from "react";
import FlowBuilder from "@/components/flow/FlowBuilder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveWorkflow } from "@/store/workflowSlice";
import { toast } from "sonner";
import WorkflowHeader from "@/components/workflows/WorkflowHeader";
import { useWorkflowExecution } from "@/hooks/useWorkflowExecution";
import SaveWorkflowDialog from "@/components/workflows/SaveWorkflowDialog";

const Workflows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  
  const dispatch = useAppDispatch();
  const currentWorkflowId = useAppSelector((state) => state.workflow.currentWorkflowId);

  const { 
    isExecuting, 
    isPending, 
    handleExecuteWorkflow 
  } = useWorkflowExecution(currentWorkflowId);

  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }

    dispatch(saveWorkflow({
      name: workflowName,
      description: workflowDescription,
    }));

    toast.success(currentWorkflowId ? "Workflow updated successfully" : "Workflow saved successfully");
    setIsSaveModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <WorkflowHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        workflowId={currentWorkflowId}
        isExecuting={isExecuting}
        isPending={isPending}
        onExecute={handleExecuteWorkflow}
        onSave={() => setIsSaveModalOpen(true)}
      />

      <SaveWorkflowDialog
        isOpen={isSaveModalOpen}
        onOpenChange={setIsSaveModalOpen}
        workflowName={workflowName}
        workflowDescription={workflowDescription}
        onWorkflowNameChange={setWorkflowName}
        onWorkflowDescriptionChange={setWorkflowDescription}
        onSave={handleSaveWorkflow}
        isEditing={!!currentWorkflowId}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <FlowBuilder />
        </div>
      </div>
    </div>
  );
};

export default Workflows;