// Setup type definitions for built-in Supabase Runtime APIs
import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import Stripe from 'https://esm.sh/stripe@15.12.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0?target=deno';

console.log('[supabase functions] Initialized Stripe webhook function.');

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  apiVersion: '2024-06-19',
  httpClient: Stripe.createFetchHttpClient()
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

// Initialize Supabase client
const supabase = createClient(Deno.env.get('SUPABASE_URL') as string, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string);

Deno.serve(async (request: Request) => {
  const signature = request.headers.get('Stripe-Signature');
  const body = await request.text();

  let receivedEvent;

  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    );

    console.log('[success] Received Stripe webhook event: ', receivedEvent);

    if (receivedEvent.type === 'payment_intent.succeeded') {
      const paymentIntent = receivedEvent.data.object;
      const paymentId = paymentIntent.id;

      const { data, error } = await supabase.from('payments').update({ status: 'succeeded' }).eq('payment_id', paymentId);

      if (error) {
        console.error('Error updating payment status: ', error);
        return new Response(error.message, { status: 500 });
      }

      console.log('Payment status updated successfully: ', data);
    }

  } catch (error) {
    console.log('[error] Could not handle Stripe webhook event: ', error); 
    return new Response(error.message, { status: 400 });
  }

  console.log(`Event received: ${receivedEvent.id}`);

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
