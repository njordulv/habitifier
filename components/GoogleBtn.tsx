'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { SiGoogle } from 'react-icons/si'
import { Button } from '@/components/ui/button'

export const GoogleBtn = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  const googleHandler = () => {
    signIn('google', { callbackUrl })
  }

  return (
    <Button variant="secondary" className="w-full" onClick={googleHandler}>
      <SiGoogle className="mr-2 h-4 w-4" />
      <span>Continue with Google</span>
    </Button>
  )
}
