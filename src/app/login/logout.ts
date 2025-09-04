'use server'

import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/utils/supabase/supabaseServer'

export async function logout() {
  const supabase = await getSupabaseServer()
  await supabase.auth.signOut()
  redirect('/login?message=' + encodeURIComponent('Signed out'))
}
