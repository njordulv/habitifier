'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const listVariants = {
  offscreen: {},
  onscreen: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.4,
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  offscreen: {
    opacity: 0,
    y: 30,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.8,
    },
  },
}

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
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={listVariants}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <m.h1 variants={itemVariants}>Habitifier</m.h1>
          <m.h2 variants={itemVariants}>Build Better Habits Effortlessly</m.h2>
          <m.div
            variants={itemVariants}
            className="max-w-lg text-center text-base leading-relaxed"
          >
            <div>Transform your goals into daily habits.</div>
            <div>
              Habitifier helps you track progress, stay motivated, and achieve
              the results you desire.
            </div>
          </m.div>
          <m.div variants={itemVariants}>
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
