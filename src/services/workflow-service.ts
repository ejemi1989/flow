import { supabase } from "@/integrations/supabase/client";
import { CreateWorkflowInput, UpdateWorkflowInput, WorkflowResponse } from "@/types/workflow";
import { nodeToPlainObject, edgeToPlainObject } from "@/utils/workflow-converters";
import { Json } from "@/integrations/supabase/types";

export const workflowService = {
  async fetchWorkflows() {
    console.log("Fetching workflows from service...");
    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching workflows:", error);
      throw error;
    }

    return data as WorkflowResponse[];
  },

  async createWorkflow(input: CreateWorkflowInput) {
    const user = await supabase.auth.getUser();
      
    if (!user.data.user?.id) {
      throw new Error("User not authenticated");
    }

    const workflowData = {
      user_id: user.data.user.id,
      name: input.name,
      description: input.description,
      nodes: JSON.stringify(input.nodes?.map(nodeToPlainObject) || []) as Json,
      edges: JSON.stringify(input.edges?.map(edgeToPlainObject) || []) as Json
    };

    console.log("Creating workflow with data:", workflowData);

    const { data, error } = await supabase
      .from("workflows")
      .insert([workflowData])
      .select()
      .single();

    if (error) {
      console.error("Error creating workflow:", error);
      throw error;
    }

    return data as WorkflowResponse;
  },

  async updateWorkflow(input: UpdateWorkflowInput) {
    const user = await supabase.auth.getUser();
      
    if (!user.data.user?.id) {
      throw new Error("User not authenticated");
    }

    const workflowData = {
      name: input.name,
      description: input.description,
      nodes: JSON.stringify(input.nodes?.map(nodeToPlainObject) || []) as Json,
      edges: JSON.stringify(input.edges?.map(edgeToPlainObject) || []) as Json,
      updated_at: new Date().toISOString()
    };

    console.log("Updating workflow with data:", workflowData);

    const { data, error } = await supabase
      .from("workflows")
      .update(workflowData)
      .eq('id', input.id)
      .eq('user_id', user.data.user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating workflow:", error);
      throw error;
    }

    return data as WorkflowResponse;
  }
};