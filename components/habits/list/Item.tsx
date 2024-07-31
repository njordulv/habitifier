import dynamic from 'next/dynamic'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { iconsLibrary } from '@/config/icons'
import { Spinner } from '@/components/ui/spinner'
import { Days } from '@/components/habits/parts/Days'
import { Goals } from '@/components/habits/parts/Goals'
import { Reminders } from '@/components/habits/parts/Reminders'
import { HabitItemsProps } from '@/interfaces'

const UpdateDialog = dynamic(
  () =>
    import('@/components/habits/crud/UpdateDialog').then(
      (mod) => mod.UpdateDialog
    ),
  {
    loading: () => <Spinner size={20} />,
  }
)

const RemoveDialog = dynamic(
  () =>
    import('@/components/habits/crud/RemoveDialog').then(
      (mod) => mod.RemoveDialog
    ),
  {
    loading: () => <Spinner size={20} />,
  }
)

const itemVariants = {
  inactive: {
    opacity: 0,
    scale: 0.96,
    y: 15,
  },
  active: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.2,
    },
  }),
}

export const Item: React.FC<HabitItemsProps> = ({
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
            <div className="grid grid-flow-row-dense grid-cols-[1fr_11fr] pr-7 items-end sm:gap-4 gap-3 text-muted-foreground text-left text-xs">
              <IconComponent size={30} className={`${habit.color}`} />
              <div className="flex flex-col gap-2">
                <h3 className="sm:text-lg text-base font-medium text-white">
                  {habit.name}
                </h3>
                <div className="flex flex-wrap gap-1">
                  <Days elements={habit.days} color={habit.color} />
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
              <div className="pl-12 pr-3 flex flex-wrap items-center w-full gap-2 text-muted-foreground">
                {habit.reminder && (
                  <Reminders list={habit.reminder} color={habit.color} />
                )}
                {habit.goal && (
                  <Goals
                    goal={habit.goal}
                    units={habit.units}
                    color={habit.color}
                  />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-12 text-muted-foreground">
                {habit.time_of_day !== 'anytime' ? `Repeat every ` : `Repeat `}
                <span className={habit.color}>{habit.time_of_day}</span>
              </div>
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
