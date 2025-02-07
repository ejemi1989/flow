import { NodeCategory } from '../types/flow';

export const nodeCategories: NodeCategory[] = [
  {
    title: 'Triggers',
    color: 'purple',
    items: [
      { 
        type: 'trigger', 
        label: 'Event Trigger',
        description: 'Start workflow on event',
        icon: 'AlertTriangle'
      },
      { 
        type: 'webhook', 
        label: 'Webhook',
        description: 'Trigger on HTTP request',
        icon: 'Webhook'
      },
    ],
  },
  {
    title: 'Flow Control',
    color: 'blue',
    items: [
      { 
        type: 'condition', 
        label: 'Condition',
        description: 'Branch based on conditions',
        icon: 'GitBranch'
      },
      { 
        type: 'parameter', 
        label: 'Variable',
        description: 'Set workflow variables',
        icon: 'Variable'
      },
      { 
        type: 'delay', 
        label: 'Delay',
        description: 'Add time delay',
        icon: 'Clock'
      },
      { 
        type: 'filter', 
        label: 'Filter',
        description: 'Filter data',
        icon: 'Filter'
      },
      { 
        type: 'transform', 
        label: 'Transform',
        description: 'Transform data format',
        icon: 'RefreshCw'
      },
    ],
  },
  {
    title: 'Actions',
    color: 'green',
    items: [
      { 
        type: 'email', 
        label: 'Send Email',
        description: 'Send email message',
        icon: 'Mail'
      },
      { 
        type: 'notification', 
        label: 'Notification',
        description: 'Send notification',
        icon: 'Bell'
      },
      { 
        type: 'action', 
        label: 'Custom Action',
        description: 'Execute custom action',
        icon: 'Zap'
      },
      { 
        type: 'api', 
        label: 'API Request',
        description: 'Make HTTP request',
        icon: 'Globe'
      },
    ],
  },
  {
    title: 'Social Media',
    color: 'blue',
    items: [
      { 
        type: 'twitter', 
        label: 'Twitter Post',
        description: 'Create and schedule tweets',
        icon: 'Twitter'
      },
      { 
        type: 'linkedin', 
        label: 'LinkedIn Post',
        description: 'Share on LinkedIn',
        icon: 'Linkedin'
      },
      { 
        type: 'instagram', 
        label: 'Instagram Post',
        description: 'Share on Instagram',
        icon: 'Instagram'
      },
      { 
        type: 'socialanalytics', 
        label: 'Analytics',
        description: 'Track social media metrics',
        icon: 'BarChart3'
      },
    ],
  },
  {
    title: 'AI & ML',
    color: 'pink',
    items: [
      { 
        type: 'ai', 
        label: 'AI Task',
        description: 'AI processing task',
        icon: 'Brain'
      },
      { 
        type: 'gptsales', 
        label: 'GPT Sales Assistant',
        description: 'AI sales automation',
        icon: 'Brain'
      },
    ],
  },
  {
    title: 'CRM & Business',
    color: 'blue',
    items: [
      { 
        type: 'salesforce', 
        label: 'Salesforce',
        description: 'Connect with Salesforce CRM',
        icon: 'Building2'
      },
      { 
        type: 'monday', 
        label: 'Monday.com',
        description: 'Connect with Monday.com',
        icon: 'Calendar'
      },
      { 
        type: 'mondayapi', 
        label: 'Monday.com API',
        description: 'Advanced Monday.com operations',
        icon: 'Calendar'
      },
      { 
        type: 'lead', 
        label: 'Lead',
        description: 'Lead management',
        icon: 'Users'
      },
    ],
  },
  {
    title: 'Communication',
    color: 'red',
    items: [
      { 
        type: 'gmail', 
        label: 'Gmail',
        description: 'Connect with Gmail',
        icon: 'Mail'
      },
    ],
  },
  {
    title: 'Integrations',
    color: 'indigo',
    items: [
      { 
        type: 'zapier', 
        label: 'Zapier',
        description: 'Connect with Zapier',
        icon: 'Webhook'
      },
      { 
        type: 'integration', 
        label: 'Custom Integration',
        description: 'Third-party integration',
        icon: 'Puzzle'
      },
    ],
  },
];