'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export const Hero = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const signInHandler = () => {
    setIsLoading(true)
    router.push('/sign-in')
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <section className="relative grid min-h-screen place-content-center overflow-hidden bg-background mt-[-52px] px-4 py-20">
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1>Habitifier</h1>
        <h2>Build Better Habits Effortlessly</h2>
        <div className="max-w-lg text-center text-base leading-relaxed">
          <div>Transform your goals into daily habits.</div>
          <div>
            Habitifier helps you track progress, stay motivated, and achieve the
            results you desire.
          </div>
          <div></div>
        </div>
        <Button
          variant="outline"
          size="lg"
          onClick={signInHandler}
          disabled={isLoading}
          icon={isLoading && <Spinner size={18} />}
        >
          Get Started
        </Button>
      </div>
    </section>
  )
}
