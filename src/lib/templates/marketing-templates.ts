import { WorkflowTemplate } from '@/types/flow';

export const marketingTemplates: WorkflowTemplate[] = [
  {
    id: 'webinar-promotion',
    name: 'Webinar/Event Promotion',
    description: 'Promote and follow up on webinar registrations',
    category: 'marketing',
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 0 },
        data: { 
          label: 'Webinar Registration',
          description: 'Triggers when someone registers for a webinar'
        },
      },
      {
        id: '2',
        type: 'email',
        position: { x: 250, y: 100 },
        data: { 
          label: 'Registration Confirmation',
          description: 'Sends confirmation email with webinar details'
        },
      },
      {
        id: '3',
        type: 'delay',
        position: { x: 250, y: 200 },
        data: { 
          label: '1 Day Before Event',
          description: 'Waits until one day before the webinar'
        },
      },
      {
        id: '4',
        type: 'email',
        position: { x: 250, y: 300 },
        data: { 
          label: 'Event Reminder',
          description: 'Sends reminder email with joining instructions'
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
  },
  {
    id: 'instagram-content-generation',
    name: 'AI Instagram Content Generator',
    description: 'Automated workflow for creating AI-generated Instagram content based on trending posts',
    category: 'marketing',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 250, y: 0 },
        data: { 
          label: 'Schedule Trigger',
          description: 'Triggers content generation on schedule'
        }
      },
      {
        id: 'api-1',
        type: 'api',
        position: { x: 250, y: 100 },
        data: { 
          label: 'Fetch Trending Posts',
          description: 'Analyzes trending Instagram hashtags'
        }
      },
      {
        id: 'ai-1',
        type: 'ai',
        position: { x: 250, y: 200 },
        data: { 
          label: 'Generate Image',
          description: 'Creates unique images using AI'
        }
      },
      {
        id: 'ai-2',
        type: 'ai',
        position: { x: 250, y: 300 },
        data: { 
          label: 'Generate Caption',
          description: 'Creates engaging captions with hashtags'
        }
      },
      {
        id: 'api-2',
        type: 'api',
        position: { x: 250, y: 400 },
        data: { 
          label: 'Post to Instagram',
          description: 'Publishes content to Instagram'
        }
      },
      {
        id: 'notification-1',
        type: 'notification',
        position: { x: 250, y: 500 },
        data: { 
          label: 'Send Notification',
          description: 'Sends status update via Telegram'
        }
      }
    ],
    edges: [
      { id: 'e1-2', source: 'trigger-1', target: 'api-1' },
      { id: 'e2-3', source: 'api-1', target: 'ai-1' },
      { id: 'e3-4', source: 'ai-1', target: 'ai-2' },
      { id: 'e4-5', source: 'ai-2', target: 'api-2' },
      { id: 'e5-6', source: 'api-2', target: 'notification-1' }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];