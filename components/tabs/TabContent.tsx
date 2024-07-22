'use client'

import { motion, Variants } from 'framer-motion'
import { ListItem } from '@/components/habits/ListItem'
import { HabitProps } from '@/interfaces'

const tabContentVariant: Variants = {
  active: {
    display: 'block',
    transition: {
      staggerChildren: 0.2,
    },
  },
  inactive: {
    display: 'none',
  },
}

const habitVariant: Variants = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  inactive: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5,
    },
  },
}

interface TabContentProps {
  id: string
  active: boolean
  habits: HabitProps[]
}

const TabContent: React.FC<TabContentProps> = ({ id, active, habits }) => (
  <motion.div
    role="tabpanel"
    id={id}
    className="tab-content"
    variants={tabContentVariant}
    animate={active ? 'active' : 'inactive'}
    initial="inactive"
  >
    <div className="flex flex-col gap-4">
      {habits.map((habit) => (
        <motion.div key={habit.id} variants={habitVariant}>
          <ListItem habit={habit} />
        </motion.div>
      ))}
    </div>
  </motion.div>
)
export default TabContent
