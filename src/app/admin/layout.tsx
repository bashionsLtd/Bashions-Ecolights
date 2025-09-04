// src/app/admin/layout.tsx
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import Sidebar from './components/dashboard/Sidebar'
import { getSupabaseServer } from '@/lib/utils/supabase/supabaseServer'

// Optional: ensure this layout is never statically optimized
export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Use the cookie-aware SSR client so Supabase auth works in RSC
  const supabase = await getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  // Secondary guard (primary guard should already happen in src/middleware.ts)
  if (!user) {
    // You can tack on ?returnTo=/admin here if you want;
    // middleware already preserves returnTo for deep links.
    redirect('/login')
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-[1fr_7fr] bg-slate-50">
      <Sidebar />
      {children}
    </div>
  )
}
