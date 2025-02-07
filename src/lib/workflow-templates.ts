import { WorkflowTemplate } from '@/types/flow';
import { salesTemplates } from './templates/sales-templates';
import { marketingTemplates } from './templates/marketing-templates';
import { supportTemplates } from './templates/support-templates';
import { testTemplates } from './templates/test-templates';

export const workflowTemplates: WorkflowTemplate[] = [
  ...salesTemplates,
  ...marketingTemplates,
  ...supportTemplates,
  ...testTemplates
];

export type { WorkflowTemplate };