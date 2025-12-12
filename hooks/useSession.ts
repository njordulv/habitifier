import { useState, useEffect } from 'react'
import { Session } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (mounted) setSession(session)
      } catch (error) {
        console.error('Error get session:', error)
      }
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) setSession(session)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return session
}
