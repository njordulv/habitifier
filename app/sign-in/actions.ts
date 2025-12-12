'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/utils/supabase/client-server'

export async function login(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!data.email || !data.password) {
    console.error('Email or password is missing.')
    return redirect('/error')
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Error logging in:', error)
    return redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
