import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { GoClock } from 'react-icons/go'
import { iconsLibrary } from '@/config/icons'
import { formatTimeForDisplay } from '@/components/ui/time-picker-utils'
import { UpdateDialog } from '@/components/crud/UpdateDialog'
import { RemoveDialog } from '@/components/crud/RemoveDialog'
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
        <Accordion
          type="single"
          collapsible
          className="border rounded-md sm:p-5 sm:gap-5 p-4 gap-4 relative"
        >
          <AccordionItem value="item-1">
            <div className="grid grid-flow-row-dense grid-cols-[1fr_11fr] pr-7 items-center sm:gap-4 gap-3 text-muted-foreground text-left text-xs">
              <IconComponent size={30} className={`${habit.color}`} />
              <div className="flex flex-col gap-2">
                <h3 className="sm:text-lg text-base font-medium text-white">
                  {habit.name}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {habit.days.length === 7 ? (
                    <span
                      className={`${habit.color} bg-dark px-2 py-1 rounded-lg capitalize`}
                    >
                      Everyday
                    </span>
                  ) : (
                    habit.days.map((day) => (
                      <span
                        key={day}
                        className={`${habit.color} bg-dark px-2 py-1 rounded-lg capitalize`}
                      >
                        {day}
                      </span>
                    ))
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {habit.reminder && (
                    <>
                      {habit.reminder.map((time: string, index: number) => (
                        <span key={index} className="flex items-center gap-1">
                          <span
                            className={`${habit.color} bg-dark flex items-center gap-1 px-1 py-1 rounded-md`}
                          >
                            <GoClock color={habit.color} />
                          </span>
                          {formatTimeForDisplay(time)}
                        </span>
                      ))}
                    </>
                  )}
                  {habit.goal && (
                    <div className="flex text-sm">
                      <span className={habit.color}>0</span>
                      <span className="color-dark">/{habit.goal}</span>
                      <div>&nbsp;{habit.units}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute right-5 top-5 flex flex-col gap-3">
                <UpdateDialog
                  habitId={habit.id}
                  onHabitUpdate={onHabitUpdate}
                />
                <RemoveDialog
                  habitId={habit.id}
                  onHabitUpdate={onHabitUpdate}
                />
              </div>
            </div>
            <AccordionTrigger>
              <div className="pl-12 text-muted-foreground">
                {habit.time_of_day !== 'anytime' ? `Repeat every ` : `Repeat `}
                <span className={habit.color}>{habit.time_of_day}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-12 flex text-muted-foreground">
                Notification sound:&nbsp;
                <span className={habit.color}>{habit.sound}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </m.li>
    </LazyMotion>
  )
}
