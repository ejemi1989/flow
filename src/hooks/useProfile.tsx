import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface UpdateProfileInput {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export function useProfile() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("Fetching profile...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No authenticated user found");
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile");
        throw error;
      }

      return data as Profile;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      console.log("Updating profile:", input);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No authenticated user");
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(input)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
  });

  return {
    profile,
    isLoading,
    updateProfile: updateProfile.mutate,
  };
}