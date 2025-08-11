'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function logout() {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
}
