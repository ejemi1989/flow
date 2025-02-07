import { Node, Edge } from '@xyflow/react';
import { NodeData } from './flow';
import { Json } from '@/integrations/supabase/types';
import { Database } from '@/integrations/supabase/types';

export interface Workflow {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  nodes: Node<NodeData>[];
  edges: Edge[];
  created_at: string;
  updated_at: string;
}

export interface CreateWorkflowInput {
  name: string;
  description?: string;
  nodes?: Node<NodeData>[];
  edges?: Edge[];
}

export interface UpdateWorkflowInput extends CreateWorkflowInput {
  id: string;
}

export interface WorkflowResponse extends Omit<Database['public']['Tables']['workflows']['Row'], 'nodes' | 'edges'> {
  nodes: Json;
  edges: Json;
}