import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import WorkflowCard from "./WorkflowCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const WorkflowGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // Fetch workflows
  const { data: workflows = [], isLoading } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      console.log("Fetching workflows...");
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq('user_id', user.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching workflows:", error);
        toast.error("Failed to fetch workflows");
        throw error;
      }

      console.log("Fetched workflows:", data);
      return data;
    },
  });

  // Delete workflow mutation
  const deleteWorkflow = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting workflow:", id);
      const { error } = await supabase
        .from("workflows")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
      toast.success("Workflow deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting workflow:", error);
      toast.error("Failed to delete workflow");
    },
  });

  // Filter workflows based on search query
  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-48 bg-gray-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search workflows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            id={workflow.id}
            name={workflow.name}
            description={workflow.description}
            createdAt={workflow.created_at}
            onDelete={(id) => deleteWorkflow.mutate(id)}
          />
        ))}

        {filteredWorkflows.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No workflows found
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowGrid;