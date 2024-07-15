'use client'

import { createClient } from '@/utils/supabase/client'

export const SignOut = ({ ...props }) => {
  const supabase = createClient()

  const logOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button onClick={logOut} {...props}>
      Sign Out
    </button>
  )
}
