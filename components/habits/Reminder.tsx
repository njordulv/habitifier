'use client'

import { TimePicker } from '@/components/ui/time-picker'
import { Button } from '@/components/ui/button'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

export const Reminder = () => {
  const { reminder, setReminder } = useCreateHabitStore()

  const addReminder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const now = new Date()
    now.setMinutes(now.getMinutes() + 5)
    setReminder([...reminder, now])
  }

  const updateReminder = (index: number) => (newDate: Date | undefined) => {
    if (newDate) {
      const newReminders = [...reminder]
      newReminders[index] = newDate
      setReminder(newReminders)
    }
  }

  const removeReminder = (index: number) => () => {
    const newReminders = reminder.filter((_, i) => i !== index)
    setReminder(newReminders)
  }

  return (
    <div className="flex flex-col gap-2">
      {reminder.map((date, index) => (
        <TimePicker
          key={index}
          date={date}
          setDate={updateReminder(index)}
          onRemove={removeReminder(index)}
        />
      ))}
      <Button onClick={addReminder} variant="secondary">
        Add Time
      </Button>
    </div>
  )
}
