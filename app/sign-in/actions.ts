'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

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
