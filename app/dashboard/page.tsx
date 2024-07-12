import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/sign-in')
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Profile</h1>
      <p>Hello {data.user.email}</p>
    </main>
  )
}
