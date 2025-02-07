export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_content_workflows: {
        Row: {
          caption_style: string | null
          content_type: string
          created_at: string
          hashtags: string[]
          id: string
          image_style: string | null
          last_execution: string | null
          metadata: Json | null
          next_execution: string | null
          prompt_template: string | null
          schedule_interval: string | null
          status: string | null
          telegram_chat_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          caption_style?: string | null
          content_type: string
          created_at?: string
          hashtags?: string[]
          id?: string
          image_style?: string | null
          last_execution?: string | null
          metadata?: Json | null
          next_execution?: string | null
          prompt_template?: string | null
          schedule_interval?: string | null
          status?: string | null
          telegram_chat_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          caption_style?: string | null
          content_type?: string
          created_at?: string
          hashtags?: string[]
          id?: string
          image_style?: string | null
          last_execution?: string | null
          metadata?: Json | null
          next_execution?: string | null
          prompt_template?: string | null
          schedule_interval?: string | null
          status?: string | null
          telegram_chat_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_content_workflows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_generated_content: {
        Row: {
          caption: string | null
          created_at: string
          hashtags: string[] | null
          id: string
          image_url: string | null
          metadata: Json | null
          posted_at: string | null
          status: string | null
          updated_at: string
          workflow_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          posted_at?: string | null
          status?: string | null
          updated_at?: string
          workflow_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          hashtags?: string[] | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          posted_at?: string | null
          status?: string | null
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_generated_content_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "instagram_content_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          contact_id: string | null
          created_at: string
          id: string
          notes: string | null
          source: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          source?: string | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      node_configurations: {
        Row: {
          config: Json
          created_at: string
          id: string
          node_id: string
          updated_at: string
          workflow_id: string
        }
        Insert: {
          config: Json
          created_at?: string
          id?: string
          node_id: string
          updated_at?: string
          workflow_id: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          node_id?: string
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "node_configurations_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      workflow_executions: {
        Row: {
          completed_at: string | null
          error: string | null
          execution_logs: Json | null
          execution_steps: Json | null
          id: string
          results: Json | null
          started_at: string
          status: string
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          error?: string | null
          execution_logs?: Json | null
          execution_steps?: Json | null
          id?: string
          results?: Json | null
          started_at?: string
          status: string
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          error?: string | null
          execution_logs?: Json | null
          execution_steps?: Json | null
          id?: string
          results?: Json | null
          started_at?: string
          status?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_history: {
        Row: {
          executed_at: string
          id: string
          results: Json | null
          status: string
          workflow_id: string
        }
        Insert: {
          executed_at?: string
          id?: string
          results?: Json | null
          status: string
          workflow_id: string
        }
        Update: {
          executed_at?: string
          id?: string
          results?: Json | null
          status?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_history_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_templates: {
        Row: {
          category: string
          created_at: string
          description: string | null
          edges: Json | null
          id: string
          name: string
          nodes: Json | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          edges?: Json | null
          id?: string
          name: string
          nodes?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          edges?: Json | null
          id?: string
          name?: string
          nodes?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string
          description: string | null
          edges: Json | null
          id: string
          name: string
          nodes: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          edges?: Json | null
          id?: string
          name: string
          nodes?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          edges?: Json | null
          id?: string
          name?: string
          nodes?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
