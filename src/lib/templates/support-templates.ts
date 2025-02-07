import { WorkflowTemplate } from '@/types/flow';

export const supportTemplates: WorkflowTemplate[] = [
  {
    id: 'churn-prevention',
    name: 'Churn Prevention',
    description: 'Identify and engage at-risk customers',
    category: 'support',
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 0 },
        data: { 
          label: 'Low Usage Detected',
          description: 'Triggers when customer usage drops below threshold'
        },
      },
      {
        id: '2',
        type: 'ai',
        position: { x: 250, y: 100 },
        data: { 
          label: 'Analyze Risk Level',
          description: 'AI analysis of customer churn risk factors'
        },
      },
      {
        id: '3',
        type: 'condition',
        position: { x: 250, y: 200 },
        data: { 
          label: 'High Risk?',
          description: 'Evaluates if customer is at high risk of churning'
        },
      },
      {
        id: '4',
        type: 'gptsales',
        position: { x: 250, y: 300 },
        data: { 
          label: 'Generate Re-engagement Content',
          description: 'Creates personalized re-engagement messages'
        },
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];