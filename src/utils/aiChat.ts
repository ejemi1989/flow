import { Message } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { salesPrompts, formatPrompt, generateSystemPrompt } from './salesPrompts';

export const generateAIResponse = async (messages: Message[]): Promise<string> => {
  try {
    console.log('Generating AI response with messages:', messages);
    
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage.content.toLowerCase();
    
    // Identify the most relevant sales prompt based on user input
    let selectedPrompt = null;
    let variables: Record<string, string> = {};
    
    for (const [key, prompt] of Object.entries(salesPrompts)) {
      if (userInput.includes(prompt.task.toLowerCase())) {
        selectedPrompt = prompt;
        // Extract variables from the user message based on prompt placeholders
        const placeholders = prompt.prompt.match(/{([^}]+)}/g) || [];
        placeholders.forEach(placeholder => {
          const key = placeholder.replace(/{|}/g, '');
          // For now, use placeholder as is - in a real app, you'd parse these from the message
          variables[key] = '[Value to be extracted]';
        });
        break;
      }
    }

    // If no specific prompt matches, use a default conversation approach
    const finalPrompt = selectedPrompt 
      ? formatPrompt(selectedPrompt.prompt, variables)
      : lastMessage.content;

    const systemPrompt = selectedPrompt 
      ? generateSystemPrompt(selectedPrompt.task)
      : `You are an expert AI Sales Assistant. Help the user with their sales-related questions and tasks.
         Provide professional, actionable advice while maintaining a helpful and confident tone.`;

    const { data, error } = await supabase.functions.invoke('sales-ai', {
      body: {
        prompt: finalPrompt,
        systemPrompt,
        parameters: selectedPrompt?.parameters || {
          model: 'gpt-4o-mini',
          temperature: 0.7,
          max_tokens: 500
        }
      }
    });

    if (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }

    console.log('Generated AI response:', data.response);
    return data.response;
  } catch (error) {
    console.error('Error in generateAIResponse:', error);
    return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again or contact support for assistance.";
  }
};