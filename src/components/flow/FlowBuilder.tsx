"use client";

import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Panel,
  ReactFlowProvider,
  OnMove,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

import { nodeCategories } from '@/config/nodeCategories';
import { nodeTypes } from '@/config/nodeTypes';
import { defaultNodes, defaultEdges } from '@/config/defaultFlow';
import NodePanel from './NodePanel';
import NodeSettings from './NodeSettings';
import TemplateDialog from './TemplateDialog';
import SaveWorkflowDialog from '../workflows/SaveWorkflowDialog';
import { NodeData, WorkflowTemplate } from '@/types/flow';
import { useFlowHandlers } from './hooks/useFlowHandlers';
import { workflowTemplates } from '@/lib/workflow-templates';
import { toast } from 'sonner';
import { useWorkflows } from '@/hooks/useWorkflows';

interface FlowBuilderProps {
  initialNodes?: Node<NodeData>[];
  initialEdges?: Edge[];
  workflowId?: string;
}

// Helper function to ensure nodes are draggable
const ensureNodesDraggable = (nodes: Node<NodeData>[]) => {
  console.log('Ensuring nodes are draggable:', nodes);
  return nodes.map(node => ({
    ...node,
    draggable: true,
  }));
};

const Flow = ({ initialNodes, initialEdges, workflowId }: FlowBuilderProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    ensureNodesDraggable(initialNodes || defaultNodes)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || defaultEdges);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');

  const { createWorkflow, updateWorkflow } = useWorkflows();

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      try {
        const sourceNode = nodes.find(n => n.id === params.source);
        const targetNode = nodes.find(n => n.id === params.target);
        
        if (sourceNode && targetNode) {
          if (params.source === params.target) {
            toast.error("Cannot connect a node to itself");
            return;
          }
          
          const existingConnection = edges.find(e => 
            e.target === params.target && e.source === params.source
          );
          
          if (existingConnection) {
            toast.error("Connection already exists");
            return;
          }

          setEdges((eds) => addEdge({ ...params, id: uuidv4() }, eds));
          toast.success("Connection created successfully");
        }
      } catch (error) {
        console.error('Error in onConnect:', error);
        toast.error("Failed to create connection");
      }
    },
    [nodes, edges, setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    try {
      console.log('Node clicked:', node);
      setSelectedNode(node);
    } catch (error) {
      console.error('Error in onNodeClick:', error);
    }
  }, []);

  const { onDragOver, onDrop, onDragStart } = useFlowHandlers(nodes, setNodes);

  const onMoveEnd = useCallback<OnMove>((_, viewport) => {
    try {
      setZoom(viewport.zoom);
    } catch (error) {
      console.error('Error in onMoveEnd:', error);
    }
  }, []);

  const handleTemplateSelect = useCallback((template: WorkflowTemplate) => {
    try {
      console.log('Applying template:', template);
      setNodes(ensureNodesDraggable(template.nodes));
      setEdges(template.edges);
      setWorkflowName(template.name);
      setWorkflowDescription(template.description || '');
      toast.success(`Template "${template.name}" applied successfully`);
    } catch (error) {
      console.error('Error in handleTemplateSelect:', error);
      toast.error("Failed to apply template");
    }
  }, [setNodes, setEdges]);

  const handleSaveWorkflow = async () => {
    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }

    try {
      console.log('Saving workflow:', {
        name: workflowName,
        description: workflowDescription,
        nodes,
        edges
      });

      const workflowData = {
        name: workflowName,
        description: workflowDescription,
        nodes,
        edges,
      };

      if (workflowId) {
        await updateWorkflow({
          id: workflowId,
          ...workflowData,
        });
        toast.success('Workflow updated successfully');
      } else {
        await createWorkflow(workflowData);
        toast.success('Workflow saved successfully');
      }
      
      setIsSaveDialogOpen(false);
    } catch (error) {
      console.error('Error saving workflow:', error);
      toast.error('Failed to save workflow. Please try again.');
    }
  };

  // Clear the canvas
  const clearCanvas = useCallback(() => {
    try {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
    } catch (error) {
      console.error('Error in clearCanvas:', error);
    }
  }, [setNodes, setEdges]);

  // Initialize with proper nodes when component mounts or workflowId changes
  useEffect(() => {
    try {
      if (initialNodes && initialEdges) {
        console.log('Setting initial nodes:', initialNodes);
        console.log('Setting initial edges:', initialEdges);
        setNodes(ensureNodesDraggable(initialNodes));
        setEdges(initialEdges);
      } else {
        console.log('Clearing canvas - no initial nodes/edges');
        clearCanvas();
      }
    } catch (error) {
      console.error('Error in initialization effect:', error);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges, clearCanvas]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onNodeClick={onNodeClick}
      fitView
      minZoom={0.1}
      maxZoom={4}
      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      onMoveEnd={onMoveEnd}
      className="bg-[#f8fafc]"
      draggable={true}
      selectNodesOnDrag={true}
    >
      <Controls className="bg-white rounded-lg shadow-lg border border-gray-200" />
      <MiniMap 
        className="bg-white rounded-lg shadow-lg border border-gray-200"
        nodeColor={(node) => {
          switch (node.type) {
            case 'trigger':
              return '#9333ea';
            case 'condition':
              return '#2563eb';
            case 'action':
              return '#16a34a';
            default:
              return '#64748b';
          }
        }}
        maskColor="rgba(248, 250, 252, 0.5)"
      />
      <Background gap={12} size={1} color="#e2e8f0" />
      
      <Panel position="top-left">
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsTemplateDialogOpen(true)}
            className="mb-2"
          >
            Use Template
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSaveDialogOpen(true)}
            className="mb-2"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Workflow
          </Button>
          <NodePanel 
            categories={nodeCategories}
            zoom={zoom}
            onDragStart={onDragStart}
          />
        </div>
      </Panel>

      <NodeSettings
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      <TemplateDialog
        templates={workflowTemplates}
        onSelectTemplate={handleTemplateSelect}
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
      />

      <SaveWorkflowDialog
        isOpen={isSaveDialogOpen}
        onOpenChange={setIsSaveDialogOpen}
        workflowName={workflowName}
        workflowDescription={workflowDescription}
        onWorkflowNameChange={setWorkflowName}
        onWorkflowDescriptionChange={setWorkflowDescription}
        onSave={handleSaveWorkflow}
        isEditing={!!workflowId}
      />
    </ReactFlow>
  );
};

const FlowBuilder = (props: FlowBuilderProps) => {
  return (
    <div className="w-full h-[800px] bg-[#f8fafc] relative">
      <ReactFlowProvider>
        <Flow {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;