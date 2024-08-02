import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Hero } from '@/components/dashboard/Hero'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/sign-in')
  }

  return <Hero data={{ user: data.user }} />
}
