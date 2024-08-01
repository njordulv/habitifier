'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function Offline() {
  const router = useRouter()
  const [isOnline, setIsOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (navigator.onLine) {
      router.push('/dashboard')
    }
  }, [router])

  useEffect(() => {
    setIsLoading(true)
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      router.push('/dashboard')
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [router])

  useEffect(() => {
    if (isOnline) {
      setIsLoading(false)
    }
  }, [isOnline])

  if (isOnline) {
    return null
  }

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>You are offline</CardTitle>
        <CardDescription>
          Please check your internet connection and try again.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          disabled={isLoading}
        >
          {isLoading && <Spinner size={18} />}
          <span>Reload Page</span>
        </Button>
      </CardContent>
    </Card>
  )
}
