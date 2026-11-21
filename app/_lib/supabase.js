import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

function missingConfigurationError() {
  const missing = [];
  if (!supabaseUrl) missing.push("SUPABASE_URL");
  if (!supabaseKey) missing.push("SUPABASE_KEY");

  return new Error(
    `Missing ${missing.join(" and ")} in .env.local. Set SUPABASE_KEY to your Supabase publishable/anon key, not the service-role key.`
  );
}

const supabaseClient =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const supabase = {
  from(table) {
    if (!supabaseClient) throw missingConfigurationError();
    return supabaseClient.from(table);
  },
};
