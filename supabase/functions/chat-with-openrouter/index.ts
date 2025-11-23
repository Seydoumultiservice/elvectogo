import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'ELVEC TOGO, entreprise leader au Togo spécialisée dans :
- Location d'engins lourds (bulldozers, pelles, niveleuses, compacteurs, grues)
- Location de voitures avec chauffeur
- Formation aux engins lourds
- Travaux de terrassement, démolition, pavage
- Services agricoles

RÈGLES DE CONVERSATION :
1. Sois chaleureux, professionnel et serviable
2. Utilise un français simple et accessible
3. Pose des questions pour bien comprendre les besoins
4. Propose des solutions concrètes adaptées
5. SI l'utilisateur montre un intérêt sérieux, demande poliment son nom et ses coordonnées
   
INFORMATIONS CLÉS :
- Téléphone : +228 70 60 03 06
- WhatsApp : +228 90 94 06 95
- Email : contact@elvectogo.com
- Localisation : Lomé, Togo
- Horaires : Lun-Ven 07h-12h et 14h-18h, Sam 07h-12h

NE PAS inventer de prix ou détails techniques spécifiques. Propose toujours de contacter l'équipe pour un devis personnalisé.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId, conversationId } = await req.json();
    console.log('Chat request received:', { sessionId, conversationId, messageCount: messages.length });

    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY not configured');
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Créer ou récupérer la conversation
    let convId = conversationId;
    if (!convId) {
      const { data: existingConv } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('session_id', sessionId)
        .eq('status', 'active')
        .single();

      if (existingConv) {
        convId = existingConv.id;
      } else {
        const { data: newConv, error: convError } = await supabase
          .from('chat_conversations')
          .insert({ session_id: sessionId })
          .select()
          .single();
        
        if (convError) throw convError;
        convId = newConv.id;
      }
    }

    // Sauvegarder le message utilisateur
    const userMessage = messages[messages.length - 1];
    await supabase.from('chat_messages').insert({
      conversation_id: convId,
      role: 'user',
      content: userMessage.content
    });

    // Détecter coordonnées dans le message
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const phoneRegex = /(?:\+228|00228)?[\s]?[0-9]{2}[\s]?[0-9]{2}[\s]?[0-9]{2}[\s]?[0-9]{2}/g;
    const emails = userMessage.content.match(emailRegex);
    const phones = userMessage.content.match(phoneRegex);

    if (emails || phones) {
      const updates: any = {};
      if (emails) updates.visitor_email = emails[0];
      if (phones) updates.visitor_phone = phones[0];
      
      await supabase
        .from('chat_conversations')
        .update(updates)
        .eq('id', convId);
    }

    // Appel à OpenRouter avec streaming
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://elvectogo.com',
        'X-Title': 'ELVEC TOGO Chatbot',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    // Créer un stream pour collecter la réponse complète
    let fullResponse = '';
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullResponse += content;
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                  }
                } catch (e) {
                  // Ignorer les erreurs de parsing JSON
                }
              }
            }
          }

          // Sauvegarder la réponse complète dans la DB
          if (fullResponse) {
            await supabase.from('chat_messages').insert({
              conversation_id: convId,
              role: 'assistant',
              content: fullResponse
            });

            // Détecter le nom dans la conversation
            const nameRegex = /(?:je m'appelle|mon nom est|je suis)\s+([A-Z][a-zà-ÿ]+(?:\s+[A-Z][a-zà-ÿ]+)*)/i;
            const nameMatch = userMessage.content.match(nameRegex);
            if (nameMatch) {
              await supabase
                .from('chat_conversations')
                .update({ visitor_name: nameMatch[1] })
                .eq('id', convId);
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
