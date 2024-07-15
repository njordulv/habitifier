import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import { DaysOfWeekProps } from '@/interfaces'

export const DaysOfWeek: React.FC<DaysOfWeekProps> = ({
  selectedDays,
  setSelectedDays,
}) => {
  const daysOfWeek = siteConfig.daysOfWeek
  const handleButtonClick = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    event.preventDefault()
    if (selectedDays.includes(id)) {
      setSelectedDays(selectedDays.filter((day) => day !== id))
    } else {
      setSelectedDays([...selectedDays, id])
    }
  }

  return (
    <div className="flex flex-wrap gap-1 justify-between">
      {daysOfWeek.map((day) => (
        <Button
          key={day.id}
          variant={selectedDays.includes(day.id) ? 'outline' : 'secondary'}
          onClick={(event) => handleButtonClick(day.id, event)}
          className="border"
        >
          {day.name}
        </Button>
      ))}
    </div>
  )
}
