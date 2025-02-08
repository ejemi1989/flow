// @ts-ignore - Deno imports
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore - Deno imports
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { workflowId, executionId } = await req.json()

    if (!workflowId || !executionId) {
      throw new Error('Workflow ID and Execution ID are required')
    }

    console.log('Executing workflow:', workflowId, 'Execution ID:', executionId)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get workflow data
    const { data: workflow, error: workflowError } = await supabaseClient
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .single()

    if (workflowError) {
      console.error('Error fetching workflow:', workflowError)
      throw workflowError
    }

    // Execute each node in the workflow
    const nodes = workflow.nodes || []
    const executionSteps = []
    const executionLogs = []

    for (const node of nodes) {
      console.log('Executing node:', node.id, 'Type:', node.type)
      
      const stepStart = new Date()
      executionLogs.push({
        timestamp: stepStart.toISOString(),
        level: 'info',
        message: `Starting execution of node ${node.id}`,
        nodeId: node.id
      })

      try {
        // Execute node based on its type
        switch (node.type) {
          case 'instagram':
            await supabaseClient.functions.invoke('execute-instagram-workflow', {
              body: { workflowId, nodeId: node.id }
            })
            break
          // Add other node types here
          default:
            console.log('Unsupported node type:', node.type)
        }

        executionSteps.push({
          nodeId: node.id,
          status: 'completed',
          startTime: stepStart.toISOString(),
          endTime: new Date().toISOString()
        })

        executionLogs.push({
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `Successfully executed node ${node.id}`,
          nodeId: node.id
        })
      } catch (error) {
        console.error(`Error executing node ${node.id}:`, error)
        
        executionSteps.push({
          nodeId: node.id,
          status: 'failed',
          startTime: stepStart.toISOString(),
          endTime: new Date().toISOString(),
          error: error.message
        })

        executionLogs.push({
          timestamp: new Date().toISOString(),
          level: 'error',
          message: `Failed to execute node ${node.id}: ${error.message}`,
          nodeId: node.id
        })

        // Update execution status to failed
        await supabaseClient
          .from('workflow_executions')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            error: `Failed to execute node ${node.id}: ${error.message}`,
            execution_steps: executionSteps,
            execution_logs: executionLogs
          })
          .eq('id', executionId)

        throw error
      }
    }

    // Update execution status to completed
    await supabaseClient
      .from('workflow_executions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        execution_steps: executionSteps,
        execution_logs: executionLogs
      })
      .eq('id', executionId)

    console.log('Workflow execution completed successfully')

    return new Response(
      JSON.stringify({
        status: 'success',
        executionId,
        steps: executionSteps,
        logs: executionLogs
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Workflow execution failed:', error)
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})