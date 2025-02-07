import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from '@xyflow/react';
import { NodeData } from '@/types/flow';
import { v4 as uuidv4 } from 'uuid';

interface SavedWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: Node<NodeData>[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
}

interface WorkflowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  savedWorkflows: SavedWorkflow[];
  currentWorkflowId: string | null;
}

interface SaveWorkflowPayload {
  name: string;
  description: string;
  nodes?: Node<NodeData>[];
  edges?: Edge[];
}

const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  savedWorkflows: [],
  currentWorkflowId: null,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node<NodeData>[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    saveWorkflow: (state, action: PayloadAction<SaveWorkflowPayload>) => {
      const { name, description, nodes = state.nodes, edges = state.edges } = action.payload;
      const now = new Date().toISOString();
      
      if (state.currentWorkflowId) {
        // Update existing workflow
        const index = state.savedWorkflows.findIndex(w => w.id === state.currentWorkflowId);
        if (index !== -1) {
          state.savedWorkflows[index] = {
            ...state.savedWorkflows[index],
            name,
            description,
            nodes,
            edges,
            updatedAt: now,
          };
        }
      } else {
        // Create new workflow using uuidv4 instead of crypto.randomUUID
        const newWorkflow: SavedWorkflow = {
          id: uuidv4(),
          name,
          description,
          nodes,
          edges,
          createdAt: now,
          updatedAt: now,
        };
        state.savedWorkflows.push(newWorkflow);
        state.currentWorkflowId = newWorkflow.id;
      }
    },
    loadWorkflow: (state, action: PayloadAction<string>) => {
      const workflow = state.savedWorkflows.find(w => w.id === action.payload);
      if (workflow) {
        state.nodes = workflow.nodes;
        state.edges = workflow.edges;
        state.currentWorkflowId = workflow.id;
      }
    },
    clearCurrentWorkflow: (state) => {
      state.nodes = [];
      state.edges = [];
      state.currentWorkflowId = null;
    },
  },
});

export const {
  setNodes,
  setEdges,
  setSelectedNode,
  saveWorkflow,
  loadWorkflow,
  clearCurrentWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;