import { createClient } from "@supabase/supabase-js";

import { env, isServiceRoleConfigured } from "@/lib/env";

export function createSupabaseServiceClient() {
  if (!isServiceRoleConfigured || !env.supabaseServiceRoleKey || !env.supabaseUrl) {
    throw new Error("Supabase service role configuration is missing.");
  }

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

