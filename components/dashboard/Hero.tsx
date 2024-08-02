'use client'

import { m, LazyMotion, domAnimation } from 'framer-motion'
import { list, items } from '@/components/animations'
import { AddHabit } from '@/components/dashboard/AddHabit'

interface Props {
  data: any
}

export const Hero = ({ data }: Props) => {
  return (
    <section className="relative grid place-content-center overflow-hidden bg-background py-20">
      <LazyMotion features={domAnimation}>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={list}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <m.h1>Profile</m.h1>
          <m.h2>Hello {data.user.email}</m.h2>
          <m.div
            variants={items}
            className="max-w-lg text-center text-base leading-relaxed"
          >
            <AddHabit />
            <p>Add New Habit</p>
          </m.div>
        </m.div>
      </LazyMotion>
    </section>
  )
}
