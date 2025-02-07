"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

interface ExecutionStep {
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  error?: string;
  output?: Record<string, unknown>;
}

interface ExecutionLog {
  timestamp: string;
  level: 'info' | 'error' | 'warning';
  message: string;
  nodeId?: string;
}

interface WorkflowExecutionResults {
  logs: ExecutionLog[];
  steps: ExecutionStep[];
}

type WorkflowExecution = Database['public']['Tables']['workflow_executions']['Row'] & {
  results: WorkflowExecutionResults | null;
};

const WorkflowExecution = () => {
  const params = useParams();
  const router = useRouter();
  const executionId = params?.executionId as string;
  const [logs, setLogs] = useState<ExecutionLog[]>([]);

  // Validate executionId before querying
  const isValidUUID = executionId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(executionId);

  const { data: execution, isLoading, error } = useQuery({
    queryKey: ['workflow-execution', executionId],
    queryFn: async () => {
      if (!isValidUUID) {
        throw new Error('Invalid execution ID format');
      }

      console.log('Fetching execution details for:', executionId);
      const { data, error } = await supabase
        .from('workflow_executions')
        .select('*')
        .eq('id', executionId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching execution:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Execution not found');
      }

      // Type assertion to ensure the results match our expected structure
      const typedData = data as unknown as WorkflowExecution;
      return typedData;
    },
    enabled: !!isValidUUID,
  });

  useEffect(() => {
    if (!isValidUUID) {
      router.push('/dashboard/workflows');
    }
  }, [isValidUUID, router]);

  useEffect(() => {
    if (execution?.results) {
      const typedResults = execution.results as WorkflowExecutionResults;
      setLogs(typedResults.logs || []);
    }
  }, [execution]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!isValidUUID) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Invalid execution ID format</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <div className="p-8">Loading execution details...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!execution) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Execution not found</AlertDescription>
      </Alert>
    );
  }

  const executionResults = execution.results as WorkflowExecutionResults;

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workflow Execution</h1>
        <Badge variant={execution.status === 'completed' ? 'default' : 'destructive'}>
          {execution.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Execution Steps</h2>
          <div className="space-y-2">
            {executionResults?.steps?.map((step: ExecutionStep) => (
              <div
                key={step.nodeId}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(step.status)}
                  <span>{step.nodeId}</span>
                </div>
                <Badge>{step.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Execution Logs</h2>
          <ScrollArea className="h-[400px] border rounded-lg p-4">
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span className={`ml-2 ${
                    log.level === 'error' ? 'text-red-500' : 
                    log.level === 'warning' ? 'text-yellow-500' : 
                    'text-gray-700'
                  }`}>
                    {log.message}
                  </span>
                  {log.nodeId && (
                    <Badge variant="outline" className="ml-2">
                      {log.nodeId}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {execution.error && (
        <Alert variant="destructive">
          <AlertTitle>Execution Error</AlertTitle>
          <AlertDescription>{execution.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WorkflowExecution;