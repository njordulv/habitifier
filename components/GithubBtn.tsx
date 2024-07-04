'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { SiGithub } from 'react-icons/si'
import { Button } from '@/components/ui/button'

export const GithubBtn = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  const githubHandler = () => {
    signIn('github', { callbackUrl })
  }

  return (
    <Button variant="secondary" className="w-full" onClick={githubHandler}>
      <SiGithub className="mr-2 h-4 w-4" />
      <span>Continue with GitHub</span>
    </Button>
  )
}
