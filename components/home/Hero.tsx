'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { list, items } from '@/components/animations'
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
    <section className="relative grid place-content-center overflow-hidden bg-background px-4 py-20">
      <LazyMotion features={domAnimation}>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={list}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <m.h1 variants={items}>Habitifier</m.h1>
          <m.h2 variants={items}>Build Better Habits Effortlessly</m.h2>
          <m.div
            variants={items}
            className="max-w-lg text-center text-base leading-relaxed"
          >
            <div>Transform your goals into daily habits.</div>
            <div>
              Habitifier helps you track progress, stay motivated, and achieve
              the results you desire.
            </div>
          </m.div>
          <m.div variants={items}>
            <Button
              variant="outline"
              size="lg"
              onClick={signInHandler}
              disabled={isLoading}
              icon={isLoading && <Spinner size={18} />}
            >
              Get Started
            </Button>
          </m.div>
        </m.div>
      </LazyMotion>
    </section>
  )
}
