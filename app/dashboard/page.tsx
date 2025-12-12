import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/utils/supabase/client-server'
import { Hero } from '@/components/dashboard/Hero'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/sign-in')
  }

  return <Hero data={{ user: data.user }} />
}
