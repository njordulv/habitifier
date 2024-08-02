'use client'

import { m, LazyMotion, domAnimation } from 'framer-motion'
import { list, items } from '@/components/animations'
import { AddHabit } from '@/components/dashboard/AddHabit'
import { UserProps } from '@/interfaces'

export const Hero = ({ data }: UserProps) => {
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
          <m.h1 variants={items}>Profile</m.h1>
          <m.h2 variants={items}>
            Hello {data.user.user_metadata.full_name || data.user.email}
          </m.h2>
          <m.div
            variants={items}
            className="max-w-lg text-center text-base leading-relaxed"
          >
            <AddHabit />
          </m.div>
          <m.div variants={items}>Add New Habit</m.div>
        </m.div>
      </LazyMotion>
    </section>
  )
}
