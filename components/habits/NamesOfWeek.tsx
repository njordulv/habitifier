import { siteConfig } from '@/config/site'
import { useFormContext } from 'react-hook-form'

export const NamesOfWeek = () => {
  const { watch } = useFormContext()
  const weekDays = watch('days_of_week') || []
  const daysOfWeek = siteConfig.daysOfWeek

  if (weekDays.length === 7) {
    return <span>Everyday</span>
  }

  if (weekDays.length === 0) {
    return <span>Nothing selected</span>
  }

  const selectedDays = daysOfWeek.filter((day) => weekDays.includes(day.id))

  return (
    <>
      {selectedDays.map((day, index) => (
        <span key={day.id}>
          {day.short}
          {index < selectedDays.length - 1 && ', '}
        </span>
      ))}
    </>
  )
}
