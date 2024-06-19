import { corsHeaders } from '../_shared/cors.ts';
import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import Stripe from 'npm:stripe@^15.12.0';

const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  httpClient: Stripe.createFetchHttpClient()
});

console.log('[success] Successfully loaded Stripe library');

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    console.log('[info] Preflight request');
    return new Response('ok', { headers: corsHeaders });
  } else if (req.method === 'POST') {
    console.log('[info] Creating a new checkout session');

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: Deno.env.get('STRIPE_PRICE_ID'),
            quantity: 1
          }
        ],
        mode: 'subscription',
        success_url: Deno.env.get('PAYMENT_SUCCESS_REDIRECT_URL'),
        cancel_url: Deno.env.get('PAYMENT_CANCEL_REDIRECT_URL')
      });

      console.log(`[success] Checkout session created: ${session.id}`);
      return new Response(JSON.stringify({ url: session.url }), { headers: corsHeaders });
    } catch (e) {
      console.log(`[error] `, e);
      return new Response(e.message, { headers: corsHeaders, status: 500 });
    }
  }

  console.log('[error] Method not allowed. Only POST or OPTIONS.');
  return new Response('Method not allowed', { headers: corsHeaders, status: 405 });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-checkout-session' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
