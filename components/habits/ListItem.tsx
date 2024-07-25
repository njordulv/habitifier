import { m, LazyMotion, domAnimation } from 'framer-motion'
import { RxClock } from 'react-icons/rx'
import { iconsLibrary } from '@/config/icons'
import { formatTime } from '@/components/ui/time-picker-utils'
import { EditHabit } from '@/components/habits/EditHabit'
import { HabitProps } from '@/interfaces'

const itemVariants = {
  inactive: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },
  active: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: index * 0.2,
    },
  }),
}

interface Props extends HabitProps {
  animationKey: string
  index: number
  onHabitUpdate: () => void
}

export const ListItem: React.FC<Props> = ({
  animationKey,
  index,
  onHabitUpdate,
  ...habit
}) => {
  const IconComponent =
    iconsLibrary.habitIcons.find((i) => i.label === habit.icon)?.icon ||
    iconsLibrary.habitIcons[0].icon

  return (
    <LazyMotion features={domAnimation}>
      <m.li
        key={animationKey}
        custom={index}
        variants={itemVariants}
        initial="inactive"
        animate="active"
        className={habit.color}
      >
        <div className="border rounded-md p-5 gap-5 relative">
          <div className="grid grid-flow-row-dense grid-cols-[1fr_11fr_2fr] items-center gap-4 text-muted-foreground text-xs">
            <IconComponent size={30} className={`${habit.color}`} />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium text-white">{habit.name}</h3>
              <div className="flex flex-wrap gap-[2px]">
                {habit.days.map((day) => (
                  <span
                    key={day}
                    className={`${habit.color} bg-dark px-2 py-1 rounded-lg capitalize`}
                  >
                    {day}
                  </span>
                ))}
              </div>
              {habit.reminder && (
                <div className="flex gap-2 text-muted-foreground">
                  {habit.reminder.map((time: string, index: number) => (
                    <span key={index} className="flex items-center gap-1">
                      <RxClock color={habit.color} /> {formatTime(time)}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end h-full justify-between gap-1 text-sm text-muted-foreground">
              <EditHabit habitId={habit.id} onHabitUpdate={onHabitUpdate} />
              {habit.goal && (
                <div className="flex flex-col items-end">
                  <div>
                    <span className={habit.color}>0</span>
                    <span className="color-dark">/{habit.goal}</span>
                  </div>
                  <div>&nbsp;{habit.units}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </m.li>
    </LazyMotion>
  )
}
