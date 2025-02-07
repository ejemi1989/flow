import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateWorkflowInput, UpdateWorkflowInput } from "@/types/workflow";
import { convertWorkflowResponse } from "@/utils/workflow-converters";

export function useWorkflows() {
  const queryClient = useQueryClient();
  console.log("Initializing useWorkflows hook");

  const { data: workflows, isLoading } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      console.log("Fetching workflows...");
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching workflows:", error);
        toast.error("Failed to fetch workflows");
        throw error;
      }

      console.log("Fetched workflows:", data);
      return data.map(convertWorkflowResponse);
    },
  });

  const createWorkflow = useMutation({
    mutationFn: async (input: CreateWorkflowInput) => {
      console.log("Creating workflow:", input);

      const workflowData = {
        name: input.name,
        description: input.description || '',
        nodes: input.nodes ? JSON.stringify(input.nodes) : null,
        edges: input.edges ? JSON.stringify(input.edges) : null,
      };

      console.log("Saving workflow data:", workflowData);

      const { data, error } = await supabase
        .from("workflows")
        .insert(workflowData)
        .select()
        .single();

      if (error) {
        console.error("Error creating workflow:", error);
        throw error;
      }

      console.log("Created workflow:", data);
      return convertWorkflowResponse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });

  const updateWorkflow = useMutation({
    mutationFn: async (input: UpdateWorkflowInput) => {
      console.log("Updating workflow:", input);

      const workflowData = {
        name: input.name,
        description: input.description || '',
        nodes: input.nodes ? JSON.stringify(input.nodes) : null,
        edges: input.edges ? JSON.stringify(input.edges) : null,
        updated_at: new Date().toISOString(),
      };

      console.log("Updating workflow with data:", workflowData);

      const { data, error } = await supabase
        .from("workflows")
        .update(workflowData)
        .eq('id', input.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating workflow:", error);
        throw error;
      }

      console.log("Updated workflow:", data);
      return convertWorkflowResponse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });

  return {
    workflows,
    isLoading,
    createWorkflow: createWorkflow.mutate,
    updateWorkflow: updateWorkflow.mutate,
  };
}