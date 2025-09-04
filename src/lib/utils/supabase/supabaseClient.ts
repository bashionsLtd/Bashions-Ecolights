// lib/utils/supabase/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// This client is safe to use in the browser (uses anon key)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
