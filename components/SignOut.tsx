'use client'

import { GoSignOut } from 'react-icons/go'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/utils/supabase/client-browser'

export const SignOut = ({ ...props }) => {
  const supabase = createBrowserSupabaseClient()
  const router = useRouter()

  const logOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <button onClick={logOut} {...props}>
      <GoSignOut size="20" title="Sign Out" />
    </button>
  )
}
