// app/admin/layout.tsx
import { createClient } from '@/app/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from './components/dashboard/Sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Create a Supabase client
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Basic protection (replace with real check if needed)
  if (!user) {
    redirect('/login'); // or show "Access denied"
  }

  return <div className="w-full grid grid-cols-[1fr_7fr] bg-slate-50">
  <Sidebar />
  {children}
  </div>;
}
