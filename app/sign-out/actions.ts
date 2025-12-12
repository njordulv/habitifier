'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/utils/supabase/client-server'

export async function logout() {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error logout:', error)
    return redirect('/error')
  }

  revalidatePath('/')
  redirect('/')
}
