import type { Node, Edge } from '@xyflow/react';

export interface NodeData extends Record<string, unknown> {
  label?: string;
  subject?: string;
  template?: string;
  duration?: string;
  conditionType?: string;
  compareValue?: string;
  field?: string;
  prompt?: string;
  temperature?: string;
  type?: string;
  icon?: string;
  endpoint?: string;
  actionType?: string;
  description?: string;
  config?: {
    operation?: string;
    fields?: string[];
    condition?: string;
    schedule?: string;
    startDate?: string | null;
    endDate?: string | null;
    to?: string;
    subject?: string;
    template?: string;
    variables?: Record<string, string>;
  };
}

export interface NodeCategory {
  title: string;
  color: string;
  items: Array<{
    type: string;
    label: string;
    icon?: string;
    description?: string;
  }>;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  nodes: Node<NodeData>[];
  edges: Edge[];
  created_at: string;
  updated_at: string;
}