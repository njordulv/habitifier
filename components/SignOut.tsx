'use client'

import { GoSignOut } from 'react-icons/go'
import { createClient } from '@/utils/supabase/client'

export const SignOut = ({ ...props }) => {
  const supabase = createClient()

  const logOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button onClick={logOut} {...props}>
      <GoSignOut size="20" title="Sign Out" />
    </button>
  )
}
