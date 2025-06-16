
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are a helpful AI assistant for Leader Bank's Leader Link platform. You help startups and companies learn about funding options and banking services.

    Key information about Leader Bank:
    - We offer equity investment, debt financing, and accelerator program connections
    - We work with companies from seed stage to Series A and beyond
    - Our funding ranges from $50K to $50M+
    - We have an extensive network of investors, lenders, and accelerator programs
    - We provide expert guidance throughout the funding process
    - We're FDIC-insured with decades of experience

    Funding Options:
    1. Equity Investment: For startups raising capital through investor networks ($100K to $50M+)
    2. Debt Financing: Revenue-based financing, equipment loans, lines of credit, SBA loans ($50K to $10M+)
    3. Accelerator Programs: Connections to top-tier accelerator and incubator programs

    Application Process:
    - Complete online application (10-15 minutes)
    - Our team reviews and matches with opportunities
    - We facilitate introductions and support due diligence
    - We guide through closing (typically 30-90 days)

    Keep responses helpful, professional, and focused on Leader Bank's services. If users ask about specific requirements or next steps, guide them toward completing the application on the platform.`;

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
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
