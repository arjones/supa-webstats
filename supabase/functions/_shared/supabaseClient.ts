// https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/_shared/supabaseClient.ts

import { createClient, User } from "https://esm.sh/@supabase/supabase-js@2";

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

export const getCurrentUser = async (req: Request): Promise<User | null> => {
  const { data: user } = await supabaseClient(req).auth.getUser();
  return user.user;
};
