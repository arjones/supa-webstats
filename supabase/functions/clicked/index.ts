// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";
import { httpHeader2ObjectKey } from "../_shared/utils.ts";

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { title, originUrl, destinationUrl } = await req.json();

    // Extract all HTTP Headers
    const headersMetadata = Array.from(req.headers.entries()).reduce(
      (obj, item) =>
        Object.assign(obj, { [httpHeader2ObjectKey(item[0])]: item[1] }),
      {},
    );

    const { error } = await supabaseClient(req).from("raw_events")
      .insert(
        {
          metadata: {
            type: "click",
            title,
            originUrl,
            destinationUrl,
            ...headersMetadata,
          },
        },
      );

    if (error) throw error;

    // We aren't interested in the response
    return new Response("ok", { headers: corsHeaders });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
