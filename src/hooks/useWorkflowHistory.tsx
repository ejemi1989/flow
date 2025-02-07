import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WorkflowHistory {
  id: string;
  workflow_id: string;
  status: string;
  executed_at: string;
  results?: any;
}

export function useWorkflowHistory(workflowId?: string) {
  const { data: history, isLoading } = useQuery({
    queryKey: ["workflow-history", workflowId],
    queryFn: async () => {
      console.log("Fetching workflow history...");
      const query = supabase
        .from("workflow_history")
        .select("*")
        .order("executed_at", { ascending: false });

      if (workflowId) {
        query.eq("workflow_id", workflowId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching workflow history:", error);
        toast.error("Failed to fetch workflow history");
        throw error;
      }

      return data as WorkflowHistory[];
    },
    enabled: !workflowId || !!workflowId,
  });

  return {
    history,
    isLoading,
  };
}