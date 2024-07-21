'use client'

import { useRef } from 'react'
import { RxClock, RxCross1 } from 'react-icons/rx'
import { Button } from '@/components/ui/button'
import { TimePickerInput } from '@/components/ui/time-picker-input'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onRemove: () => void
}

export function TimePicker({ date, setDate, onRemove }: TimePickerProps) {
  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)
  const { color } = useCreateHabitStore()

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
        <span className="relative bottom-[2px]">:</span>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
        <RxClock color={color} />
      </div>
      <Button variant="destructive" onClick={onRemove}>
        <RxCross1 />
      </Button>
    </div>
  )
}
