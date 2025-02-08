import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Lead {
  id: string;
  contact_id?: string;
  status: string;
  source?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  contacts?: any;
}

interface CreateLeadInput {
  contact_id?: string;
  status: string;
  source?: string;
  notes?: string;
}

export function useLeads() {
  const queryClient = useQueryClient();

  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      console.log("Fetching leads...");
      const { data, error } = await supabase
        .from("leads")
        .select("*, contacts(*)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        toast.error("Failed to fetch leads");
        throw error;
      }

      return data as Lead[];
    },
  });

  const createLead = useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      console.log("Creating lead:", input);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("leads")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.error("Error creating lead:", error);
        toast.error("Failed to create lead");
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead created successfully");
    },
  });

  return {
    leads,
    isLoading,
    createLead: createLead.mutate,
  };
}