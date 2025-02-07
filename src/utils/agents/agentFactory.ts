import { BaseAgent } from './baseAgent';
import { SalesAgent } from './salesAgent';
import { EmailAgent } from './emailAgent';
import { SchedulingAgent } from './schedulingAgent';

export class AgentFactory {
  private static agents: Map<string, BaseAgent> = new Map<string, BaseAgent>([
    ['sales', new SalesAgent()],
    ['email', new EmailAgent()],
    ['scheduling', new SchedulingAgent()]
  ]);

  static getAgent(type: string): BaseAgent {
    const agent = this.agents.get(type);
    if (!agent) {
      throw new Error(`Agent type '${type}' not found`);
    }
    return agent;
  }

  static async executeAgent(type: string, context: any) {
    console.log(`Executing agent of type: ${type}`);
    const agent = this.getAgent(type);
    return agent.execute(context);
  }
}