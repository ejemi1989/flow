import { WorkflowTemplate } from '@/types/flow';

export const testTemplates: WorkflowTemplate[] = [
  {
    id: 'n8n-style-workflow',
    name: 'Data Processing Pipeline',
    description: 'A sample n8n-style workflow for data processing and automation',
    category: 'test',
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 0 },
        data: { 
          label: 'Webhook Trigger',
          type: 'webhook',
          endpoint: '/webhook/trigger',
          description: 'Starts workflow when webhook endpoint is called'
        },
      },
      {
        id: '2',
        type: 'parameter',
        position: { x: 250, y: 100 },
        data: { 
          label: 'Set Variables',
          type: 'object',
          value: '{"status": "new", "priority": "high"}',
          description: 'Sets initial workflow variables'
        },
      },
      {
        id: '3',
        type: 'condition',
        position: { x: 250, y: 200 },
        data: { 
          label: 'Check Priority',
          conditionType: 'equals',
          compareValue: 'high',
          field: 'priority',
          description: 'Checks if task priority is high'
        },
      },
      {
        id: '4',
        type: 'action',
        position: { x: 100, y: 300 },
        data: { 
          label: 'High Priority Process',
          actionType: 'transform',
          description: 'Processes high priority tasks',
          config: {
            operation: 'map',
            fields: ['id', 'status', 'priority']
          }
        },
      },
      {
        id: '5',
        type: 'action',
        position: { x: 400, y: 300 },
        data: { 
          label: 'Regular Process',
          actionType: 'transform',
          description: 'Processes regular priority tasks',
          config: {
            operation: 'filter',
            condition: 'status === "new"'
          }
        },
      },
      {
        id: '6',
        type: 'ai',
        position: { x: 250, y: 400 },
        data: { 
          label: 'AI Processing',
          model: 'gpt-4o-mini',
          temperature: '0.7',  // Fixed: Changed from number to string
          prompt: 'Process the following task: ${workflow.id}',
          description: 'AI-powered task processing'
        },
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', label: 'True' },
      { id: 'e3-5', source: '3', target: '5', label: 'False' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];