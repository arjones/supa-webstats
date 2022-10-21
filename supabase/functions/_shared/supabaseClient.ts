// https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/_shared/supabaseClient.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

export const supabaseClient = (req: Request) =>
  createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    },
  );
