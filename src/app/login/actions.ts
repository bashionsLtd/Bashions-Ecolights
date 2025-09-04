'use server'

import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/utils/supabase/supabaseServer'

export async function login(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  const returnTo = String(formData.get('returnTo') || '/admin')

  if (!email || !password) {
    redirect('/login?message=' + encodeURIComponent('Email and password are required'))
  }

  const supabase = await getSupabaseServer()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/login?message=' + encodeURIComponent(error.message || 'Invalid credentials'))
  }

  // On success, Supabase set/refresh cookies for you.
  redirect(returnTo || '/admin')
}
