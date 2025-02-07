export interface AgentContext {
  workflowId: string;
  nodeId: string;
  input: any;
  previousResults: Record<string, any>;
}

export interface AgentResult {
  success: boolean;
  output: any;
  error?: string;
}

export abstract class BaseAgent {
  abstract execute(context: AgentContext): Promise<AgentResult>;
  
  protected async handleError(error: any): Promise<AgentResult> {
    console.error('Agent execution error:', error);
    return {
      success: false,
      output: null,
      error: error.message || 'Unknown error occurred'
    };
  }
}