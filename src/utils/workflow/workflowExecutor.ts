import { AgentFactory } from '../agents/agentFactory';
import { toast } from 'sonner';

export class WorkflowExecutor {
  private workflowId: string;
  private nodes: any[];
  private edges: any[];
  private results: Map<string, any>;

  constructor(workflowId: string, nodes: any[], edges: any[]) {
    this.workflowId = workflowId;
    this.nodes = nodes;
    this.edges = edges;
    this.results = new Map();
  }

  async execute(initialData: any = {}) {
    try {
      console.log('Starting workflow execution:', this.workflowId);
      
      const startNodes = this.findStartNodes();
      
      for (const node of startNodes) {
        await this.executeNode(node.id, initialData);
      }
      
      toast.success('Workflow executed successfully');
      return Array.from(this.results.entries());
    } catch (error) {
      console.error('Workflow execution failed:', error);
      toast.error('Workflow execution failed');
      throw error;
    }
  }

  private findStartNodes() {
    return this.nodes.filter(node => 
      !this.edges.some(edge => edge.target === node.id)
    );
  }

  private async executeNode(nodeId: string, input: any) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node) return;

    console.log(`Executing node: ${nodeId}, type: ${node.type}`);

    try {
      const result = await AgentFactory.executeAgent(node.type, {
        workflowId: this.workflowId,
        nodeId: nodeId,
        input,
        previousResults: Object.fromEntries(this.results)
      });

      this.results.set(nodeId, result);

      // Execute next nodes
      const nextNodes = this.findNextNodes(nodeId);
      for (const nextNode of nextNodes) {
        await this.executeNode(nextNode.id, result.output);
      }
    } catch (error) {
      console.error(`Error executing node ${nodeId}:`, error);
      throw error;
    }
  }

  private findNextNodes(nodeId: string) {
    const nextEdges = this.edges.filter(edge => edge.source === nodeId);
    return nextEdges.map(edge => 
      this.nodes.find(node => node.id === edge.target)
    ).filter(Boolean);
  }
}