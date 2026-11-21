import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdminClient =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

export const supabaseAdmin = {
  from(table) {
    assertSupabaseAdminConfigured();

    return supabaseAdminClient.from(table);
  },
};

export function assertSupabaseAdminConfigured() {
  if (!supabaseAdminClient) {
    const missing = [];
    if (!supabaseUrl) missing.push("SUPABASE_URL");
    if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

    throw new Error(
      `Missing ${missing.join(" and ")} in .env.local. Set the existing service-role key under the exact name SUPABASE_SERVICE_ROLE_KEY, keep it server-only, then restart the development server.`
    );
  }
}
