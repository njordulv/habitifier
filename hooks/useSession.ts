import { useEffect, useState, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-nextjs'

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const supabase = useRef(createClientComponentClient())

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.current.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    supabase.current.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return session
}
