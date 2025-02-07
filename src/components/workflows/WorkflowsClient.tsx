"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import WorkflowHeader from './WorkflowHeader';
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Process' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'End' },
    position: { x: 250, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

export default function WorkflowsClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleExecute = async () => {
    try {
      setIsExecuting(true);
      // Implement execution logic here
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="h-full">
      <WorkflowHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewWorkflow={() => router.push('/dashboard/workflows/new')}
        workflowId={null}
        isExecuting={isExecuting}
        isPending={false}
        onExecute={handleExecute}
        onSave={() => {}}
      />
      <div className="h-[calc(100vh-200px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
} 