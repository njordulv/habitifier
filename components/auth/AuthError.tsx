'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [isLoading, setIsLoading] = useState(false)

  const backHandler = () => {
    setIsLoading(true)
    router.push('/sign-in')
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Authentication Error</CardTitle>
        <CardDescription>
          An error occurred during authentication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div>{error}</div>}
        <Button variant="secondary" onClick={backHandler} disabled={isLoading}>
          {isLoading && <Spinner size={18} />}
          <span>Back to Sign In</span>
        </Button>
      </CardContent>
    </Card>
  )
}
