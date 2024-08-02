'use client'

import { useEffect } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { GoTasklist } from 'react-icons/go'

const variants = {
  offscreen: {
    opacity: 1,
  },
  onscreen: {
    opacity: 0,
  },
}

export const LoadingScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen')
      if (loadingScreen) {
        loadingScreen.style.display = 'none'
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="offscreen"
        animate="onscreen"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="fixed left-0 top-0 right-0 bottom-0 bg-background z-50 flex flex-col items-center justify-center pointer-events-none"
      >
        <GoTasklist size={120} className="text-primary opacity-80" />
        <b className="uppercase font-medium tracking-wide font-sans">
          habitifier
        </b>
      </m.div>
    </LazyMotion>
  )
}
