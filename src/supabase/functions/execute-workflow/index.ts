import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WorkflowNode {
  id: string
  type: string
  data: Record<string, any>
}

interface WorkflowEdge {
  id: string
  source: string
  target: string
}

interface Workflow {
  id: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { workflowId } = await req.json()

    if (!workflowId) {
      throw new Error('Workflow ID is required')
    }

    // Create execution record
    const { data: executionData, error: executionError } = await supabaseClient
      .from('workflow_executions')
      .insert({
        workflow_id: workflowId,
        status: 'running',
      })
      .select()
      .single()

    if (executionError) {
      throw executionError
    }

    // Get workflow details
    const { data: workflow, error: workflowError } = await supabaseClient
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .single()

    if (workflowError) {
      throw workflowError
    }

    // Execute nodes in sequence (simplified for demo)
    const results: Record<string, any> = {}
    for (const node of workflow.nodes) {
      try {
        // Simulate node execution
        results[node.id] = {
          status: 'completed',
          output: `Executed ${node.type} node`,
        }
      } catch (error) {
        results[node.id] = {
          status: 'failed',
          error: error.message,
        }
      }
    }

    // Update execution record with results
    const { error: updateError } = await supabaseClient
      .from('workflow_executions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        results,
      })
      .eq('id', executionData.id)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        executionId: executionData.id,
        results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
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