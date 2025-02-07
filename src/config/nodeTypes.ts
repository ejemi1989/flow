
import EmailNode from '../components/flow/EmailNode';
import DelayNode from '../components/flow/DelayNode';
import ConditionNode from '../components/flow/ConditionNode';
import LeadNode from '../components/flow/LeadNode';
import TriggerNode from '../components/flow/TriggerNode';
import IntegrationNode from '../components/flow/IntegrationNode';
import ActionNode from '../components/flow/ActionNode';
import AINode from '../components/flow/AINode';
import GPTSalesNode from '../components/flow/GPTSalesNode';
import ParameterNode from '../components/flow/ParameterNode';
import WebhookNode from '../components/flow/WebhookNode';
import FilterNode from '../components/flow/FilterNode';
import TransformNode from '../components/flow/TransformNode';
import APINode from '../components/flow/APINode';
import NotificationNode from '../components/flow/NotificationNode';
import ZapierNode from '../components/flow/ZapierNode';
import SalesforceNode from '../components/flow/SalesforceNode';
import GmailNode from '../components/flow/GmailNode';
import MondayNode from '../components/flow/MondayNode';
import TwitterNode from '../components/flow/TwitterNode';
import LinkedInNode from '../components/flow/LinkedInNode';
import InstagramNode from '../components/flow/InstagramNode';
import SocialAnalyticsNode from '../components/flow/SocialAnalyticsNode';
import MondayAPINode from '../components/flow/MondayAPINode';

export const nodeTypes = {
  email: EmailNode,
  delay: DelayNode,
  condition: ConditionNode,
  lead: LeadNode,
  trigger: TriggerNode,
  integration: IntegrationNode,
  action: ActionNode,
  ai: AINode,
  gptsales: GPTSalesNode,
  parameter: ParameterNode,
  webhook: WebhookNode,
  filter: FilterNode,
  transform: TransformNode,
  api: APINode,
  notification: NotificationNode,
  zapier: ZapierNode,
  salesforce: SalesforceNode,
  gmail: GmailNode,
  monday: MondayNode,
  mondayapi: MondayAPINode,
  twitter: TwitterNode,
  linkedin: LinkedInNode,
  instagram: InstagramNode,
  socialanalytics: SocialAnalyticsNode,
};