export interface SalesPrompt {
  task: string;
  prompt: string;
  parameters: {
    model: string;
    temperature?: number;
    max_tokens?: number;
  };
}

export const salesPrompts: Record<string, SalesPrompt> = {
  leadQualification: {
    task: "qualification",
    prompt: "Analyze the following lead details and classify as high or low potential based on engagement, budget, and decision-making capacity: {lead_details}",
    parameters: {
      model: "gpt-4o-mini",
      max_tokens: 200,
    }
  },
  emailGeneration: {
    task: "email",
    prompt: "Write a persuasive follow-up sales email for {lead_name}, highlighting the value proposition of {product_name}, considering their interest in {features}.",
    parameters: {
      model: "gpt-4o-mini",
      temperature: 0.7,
    }
  },
  interactionInsights: {
    task: "crm",
    prompt: "Summarize this conversation and highlight the customer's pain points and product questions: {conversation_log}",
    parameters: {
      model: "gpt-4o-mini",
      max_tokens: 500,
    }
  },
  objectionHandling: {
    task: "objection",
    prompt: "Suggest a polite but persuasive response to this customer objection: '{customer_objection}'.",
    parameters: {
      model: "gpt-4o-mini",
      temperature: 0.5,
    }
  },
  scriptGeneration: {
    task: "script",
    prompt: "Generate a structured conversational flow for pitching {product_name} to a {customer_type} who is interested in {key_features}.",
    parameters: {
      model: "gpt-4o-mini",
      temperature: 0.6,
    }
  },
  proposalDrafting: {
    task: "proposal",
    prompt: "Draft a comprehensive proposal for {client_name}, including problem, solution, and pricing details for {product_name}.",
    parameters: {
      model: "gpt-4o-mini",
      temperature: 0.3,
    }
  },
  competitorAnalysis: {
    task: "analysis",
    prompt: "Compare the features of {competitor_name} and {product_name}, highlighting key differentiators.",
    parameters: {
      model: "gpt-4o-mini",
      temperature: 0.4,
    }
  }
};

export const formatPrompt = (prompt: string, variables: Record<string, string>): string => {
  let formattedPrompt = prompt;
  Object.entries(variables).forEach(([key, value]) => {
    formattedPrompt = formattedPrompt.replace(`{${key}}`, value);
  });
  return formattedPrompt;
};

export const generateSystemPrompt = (task: string): string => {
  return `You are an expert AI Sales Assistant specializing in ${task}. 
Your responses should be professional, actionable, and focused on driving sales outcomes.
Always maintain a confident yet helpful tone, and ensure your responses are concise and practical.`;
};