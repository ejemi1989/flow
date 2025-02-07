import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, context, task } = await req.json();
    console.log('Processing sales AI request:', { task, context });

    // Define task-specific system prompts
    const systemPrompts = {
      qualification: "You are an expert sales qualification AI. Analyze leads based on engagement, budget, and decision-making capacity.",
      email: "You are an expert email composer for sales. Create persuasive, personalized sales emails.",
      objection: "You are an expert in sales objection handling. Provide polite but persuasive responses.",
      script: "You are an expert sales script writer. Create structured, effective sales conversations.",
      proposal: "You are an expert proposal writer. Create comprehensive, persuasive sales proposals.",
      analysis: "You are an expert in competitor analysis. Identify and articulate key differentiators.",
      crm: "You are an expert in CRM documentation. Extract and organize key information from sales interactions."
    };

    // Select appropriate system prompt based on task
    const systemPrompt = systemPrompts[task] || "You are an expert sales AI assistant. Help with sales-related queries professionally.";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: task === 'email' ? 0.7 : 0.4,
        max_tokens: task === 'proposal' ? 1000 : 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate AI response');
    }

    const data = await response.json();
    console.log('Generated response for task:', task);

    return new Response(JSON.stringify({ 
      response: data.choices[0].message.content,
      task 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in sales-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});