//supabaseClient.ts
// This file is used to create a Supabase client instance for server-side operations.
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role only for server-side APIs
);

export default supabase;
