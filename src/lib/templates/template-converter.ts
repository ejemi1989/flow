import { Node, Edge } from '@xyflow/react';
import { NodeData } from '@/types/flow';

export interface WorkflowTemplate {
  nodes: TemplateNode[];
  edges: TemplateEdge[];
  metadata: {
    name: string;
    description: string;
    version: string;
    author?: string;
    tags?: string[];
  };
}

interface TemplateNode {
  id: string;
  type: string;
  label: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeData; // Make data required and explicitly type it as NodeData
}

interface TemplateEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export const convertTemplateToFlow = (template: WorkflowTemplate): {
  nodes: Node<NodeData>[];
  edges: Edge[];
} => {
  console.log('Converting template to flow:', template);

  const nodes: Node<NodeData>[] = template.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      label: node.label,
      ...node.data,
    },
    dragHandle: '.drag-handle',
    draggable: true,
    selectable: true,
  }));

  const edges: Edge[] = template.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: edge.animated,
    type: 'default',
  }));

  return { nodes, edges };
};

export const validateTemplate = (template: any): template is WorkflowTemplate => {
  console.log('Validating template:', template);

  if (!template || typeof template !== 'object') {
    console.error('Template must be an object');
    return false;
  }

  if (!Array.isArray(template.nodes) || !Array.isArray(template.edges)) {
    console.error('Template must contain nodes and edges arrays');
    return false;
  }

  if (!template.metadata || typeof template.metadata !== 'object') {
    console.error('Template must contain metadata object');
    return false;
  }

  const requiredMetadata = ['name', 'description', 'version'];
  for (const field of requiredMetadata) {
    if (!template.metadata[field]) {
      console.error(`Template metadata must contain ${field}`);
      return false;
    }
  }

  return true;
};