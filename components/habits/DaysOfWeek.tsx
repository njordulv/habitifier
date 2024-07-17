import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

export const DaysOfWeek = () => {
  const daysOfWeek = siteConfig.daysOfWeek
  const { weekDays, setWeekDays } = useCreateHabitStore()

  const handleButtonClick = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    event.preventDefault()
    if (weekDays.includes(id)) {
      setWeekDays(weekDays.filter((day) => day !== id))
    } else {
      setWeekDays([...weekDays, id])
    }
  }

  return (
    <div className="flex flex-wrap gap-1 justify-between">
      {daysOfWeek.map((day) => (
        <Button
          key={day.id}
          variant={weekDays.includes(day.id) ? 'outline' : 'secondary'}
          onClick={(event) => handleButtonClick(day.id, event)}
          className="border px-[14px]"
        >
          {day.name}
        </Button>
      ))}
    </div>
  )
}
