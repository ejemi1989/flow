import { Node, Edge } from '@xyflow/react';
import { NodeData } from '@/types/flow';
import { WorkflowResponse } from '@/types/workflow';
import { Database } from '@/integrations/supabase/types';

type WorkflowRow = Database['public']['Tables']['workflows']['Row'];

export const convertWorkflowResponse = (data: WorkflowRow): WorkflowResponse => {
  return {
    id: data.id,
    name: data.name,
    description: data.description || null,
    nodes: data.nodes,
    edges: data.edges,
    created_at: data.created_at,
    updated_at: data.updated_at,
    user_id: data.user_id
  };
};

export const nodeToPlainObject = (node: Node<NodeData>) => {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data || {},
  };
};

export const edgeToPlainObject = (edge: Edge) => {
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: edge.type,
  };
};