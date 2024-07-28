import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useFormContext } from 'react-hook-form'

export const DaysOfWeek = () => {
  const daysOfWeek = siteConfig.daysOfWeek
  const { setValue, watch } = useFormContext()
  const selectedDays = watch('days_of_week')

  const handleButtonClick = (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    event.preventDefault()
    const newSelectedDays = selectedDays.includes(id)
      ? selectedDays.filter((day: string) => day !== id)
      : [...selectedDays, id]
    setValue('days_of_week', newSelectedDays, { shouldValidate: true })
  }

  return (
    <div className="flex flex-wrap gap-[1.5%] justify-between">
      {daysOfWeek.map((day) => (
        <Button
          key={day.id}
          variant={selectedDays.includes(day.id) ? 'outline' : 'secondary'}
          onClick={(event) => handleButtonClick(day.id, event)}
          className="border px-0 w-[13%]"
        >
          {day.name}
        </Button>
      ))}
    </div>
  )
}
