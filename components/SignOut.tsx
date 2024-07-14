'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const SignOut = ({ ...props }) => {
  const supabase = createClientComponentClient()

  const logOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button onClick={logOut} {...props}>
      Sign Out
    </button>
  )
}
