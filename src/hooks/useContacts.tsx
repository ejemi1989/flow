import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Contact {
  id: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status: 'active' | 'lead' | 'customer';
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface CreateContactInput {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status: 'active' | 'lead' | 'customer';
}

interface UpdateContactInput extends Partial<CreateContactInput> {
  id: string;
}

export function useContacts() {
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      console.log("Fetching contacts...");
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to fetch contacts");
        throw error;
      }

      return data as Contact[];
    },
  });

  const createContact = useMutation({
    mutationFn: async (input: CreateContactInput) => {
      console.log("Creating contact:", input);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("contacts")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.error("Error creating contact:", error);
        toast.error("Failed to create contact");
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact created successfully");
    },
  });

  const updateContact = useMutation({
    mutationFn: async ({ id, ...input }: UpdateContactInput) => {
      console.log("Updating contact:", id, input);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("contacts")
        .update(input)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating contact:", error);
        toast.error("Failed to update contact");
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact updated successfully");
    },
  });

  const deleteContact = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting contact:", id);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully");
    },
  });

  return {
    contacts,
    isLoading,
    createContact: createContact.mutate,
    updateContact: updateContact.mutate,
    deleteContact: deleteContact.mutate,
  };
}