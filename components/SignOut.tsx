'use client'

import { GoSignOut } from 'react-icons/go'
import { createBrowserSupabaseClient } from '@/utils/supabase/client-browser'

export const SignOut = ({ ...props }) => {
  const supabase = createBrowserSupabaseClient()

  const logOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button onClick={logOut} {...props}>
      <GoSignOut size="20" title="Sign Out" />
    </button>
  )
}
