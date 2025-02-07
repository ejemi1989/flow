import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useWorkflowExecution = (workflowId: string | null) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const router = useRouter();

  const executeWorkflowMutation = useMutation({
    mutationFn: async () => {
      console.log("Starting execution with workflow ID:", workflowId);
      
      if (!workflowId) {
        throw new Error("No workflow selected");
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      setIsExecuting(true);

      const { data, error } = await supabase
        .from('workflow_executions')
        .insert([
          {
            workflow_id: workflowId,
            status: 'running',
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating workflow execution:", error);
        throw error;
      }

      console.log("Workflow execution created:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("Execution successful, navigating to:", data);
      toast.success("Workflow execution started");
      router.push(`/dashboard/workflows/execution/${data.id}`);
    },
    onError: (error: Error) => {
      console.error("Execution failed:", error);
      toast.error(error.message || "Failed to start workflow execution");
      setIsExecuting(false);
    }
  });

  const handleExecuteWorkflow = async () => {
    if (!workflowId) {
      toast.error("Please save the workflow first");
      return;
    }
    
    try {
      await executeWorkflowMutation.mutateAsync();
    } catch (error) {
      console.error("Error in handleExecuteWorkflow:", error);
    }
  };

  return {
    isExecuting,
    isPending: executeWorkflowMutation.isPending,
    handleExecuteWorkflow
  };
};