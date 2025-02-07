import { WorkflowTemplate } from '@/types/flow';

export const salesTemplates: WorkflowTemplate[] = [
  {
    id: 'post-sale-review-request',
    name: 'Post-Sale Review Request',
    description: 'Automatically send review request emails 30 days after a sale',
    category: 'sales',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 250, y: 100 },
        data: {
          label: '30-Day Post-Sale Trigger',
          type: 'schedule',
          icon: 'Clock',
          description: 'Triggers 30 days after a sale',
          config: {
            schedule: '30d',
            startDate: null,
            endDate: null
          }
        }
      },
      {
        id: 'email-1',
        type: 'action',
        position: { x: 250, y: 250 },
        data: {
          label: 'Send Review Request Email',
          type: 'email',
          icon: 'Mail',
          description: 'Sends a review request email to the customer',
          config: {
            to: '{{customerEmail}}',
            subject: 'How was your experience?',
            template: 'review-request',
            variables: {
              customerName: '{{customerName}}',
              productName: '{{productName}}'
            }
          }
        }
      }
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'trigger-1',
        target: 'email-1',
        animated: true
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sales-follow-up',
    name: 'Sales Follow-up Sequence',
    description: 'Automated follow-up sequence for sales leads',
    category: 'sales',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 250, y: 100 },
        data: {
          label: 'New Lead Trigger',
          type: 'webhook',
          icon: 'Bell',
          description: 'Triggers when a new lead is created'
        }
      },
      {
        id: 'delay-1',
        type: 'action',
        position: { x: 250, y: 200 },
        data: {
          label: '2 Day Delay',
          type: 'delay',
          icon: 'Clock',
          description: 'Waits for 2 days before sending follow-up',
          duration: '2d'
        }
      },
      {
        id: 'email-1',
        type: 'action',
        position: { x: 250, y: 300 },
        data: {
          label: 'Send Follow-up Email',
          type: 'email',
          icon: 'Mail',
          description: 'Sends initial follow-up email',
          template: 'sales-follow-up-1'
        }
      }
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'trigger-1',
        target: 'delay-1',
        animated: true
      },
      {
        id: 'e2-3',
        source: 'delay-1',
        target: 'email-1',
        animated: true
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'quote-approval',
    name: 'Quote Approval Process',
    description: 'Automated quote creation and approval workflow',
    category: 'sales',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 250, y: 100 },
        data: {
          label: 'Quote Request Trigger',
          type: 'form',
          icon: 'FileText',
          description: 'Triggers when a quote is requested'
        }
      },
      {
        id: 'condition-1',
        type: 'condition',
        position: { x: 250, y: 200 },
        data: {
          label: 'Check Amount',
          icon: 'GitBranch',
          description: 'Checks if quote amount requires approval',
          conditionType: 'number',
          field: 'amount',
          compareValue: '10000'
        }
      },
      {
        id: 'action-1',
        type: 'action',
        position: { x: 100, y: 300 },
        data: {
          label: 'Send for Approval',
          type: 'approval',
          icon: 'CheckCircle',
          description: 'Routes quote for manager approval'
        }
      },
      {
        id: 'action-2',
        type: 'action',
        position: { x: 400, y: 300 },
        data: {
          label: 'Auto Approve',
          type: 'approval',
          icon: 'Check',
          description: 'Automatically approves quote'
        }
      }
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'trigger-1',
        target: 'condition-1',
        animated: true
      },
      {
        id: 'e2-3',
        source: 'condition-1',
        target: 'action-1',
        animated: true,
        label: '> 10000'
      },
      {
        id: 'e2-4',
        source: 'condition-1',
        target: 'action-2',
        animated: true,
        label: '≤ 10000'
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];