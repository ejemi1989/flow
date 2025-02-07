import { useCallback } from 'react';
import { Node } from '@xyflow/react';
import { NodeData } from '@/types/flow';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type DraggableNode = Node<NodeData> & { draggable: boolean };

export const useFlowHandlers = (
  nodes: DraggableNode[],
  setNodes: React.Dispatch<React.SetStateAction<DraggableNode[]>>
) => {
  const saveWorkflow = useCallback(async (newNode: DraggableNode) => {
    console.log('Starting workflow save process...');
    
    try {
      // Prepare nodes data - ensure it's JSON serializable
      const allNodes = [...nodes, newNode];
      const nodesData = JSON.stringify(allNodes.map(node => ({
        id: node.id,
        type: node.type,
        position: {
          x: node.position.x,
          y: node.position.y
        },
        data: node.data || {},
        draggable: true
      })));

      // Create workflow data object
      const workflowData = {
        name: `Workflow ${nodes.length + 1}`,
        description: 'Dragged workflow',
        nodes: nodesData,
        edges: JSON.stringify([])
      };

      console.log('Saving workflow data:', workflowData);

      const { data, error } = await supabase
        .from('workflows')
        .insert(workflowData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from save operation');
      }

      console.log('Workflow saved successfully:', data);
      toast.success('Workflow saved successfully');
      
    } catch (error) {
      console.error('Error in saveWorkflow:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save workflow');
    }
  }, [nodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault();

      try {
        const type = event.dataTransfer.getData('application/reactflow/type');
        const label = event.dataTransfer.getData('application/reactflow/label');
        const icon = event.dataTransfer.getData('application/reactflow/icon');

        const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
        
        if (reactFlowBounds && type) {
          const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          };

          const newNode: DraggableNode = {
            id: `${type}-${nodes.length + 1}`,
            type,
            position,
            data: { label, icon },
            draggable: true
          };

          console.log('Creating new node:', newNode);
          setNodes((nds) => nds.concat(newNode));
          
          // Save the workflow with the new node
          await saveWorkflow(newNode);
        }
      } catch (error) {
        console.error('Error in onDrop:', error);
        toast.error('Failed to create node');
      }
    },
    [nodes, setNodes, saveWorkflow],
  );

  const onDragStart = useCallback((event: React.DragEvent, nodeData: { type: string; label: string; icon?: string }) => {
    event.dataTransfer.setData('application/reactflow/type', nodeData.type);
    event.dataTransfer.setData('application/reactflow/label', nodeData.label);
    if (nodeData.icon) {
      event.dataTransfer.setData('application/reactflow/icon', nodeData.icon);
    }
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return {
    onDragOver,
    onDrop,
    onDragStart,
  };
};