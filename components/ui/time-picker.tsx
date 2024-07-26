'use client'

import { useRef } from 'react'
import { GoClock, GoX } from 'react-icons/go'
import { Button } from '@/components/ui/button'
import { TimePickerInput } from '@/components/ui/time-picker-input'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onRemove: () => void
}

export function TimePicker({ date, setDate, onRemove }: TimePickerProps) {
  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onRemove()
  }

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
        <GoClock size={18} />
      </div>
      <Button variant="ghost" onClick={handleRemove}>
        <GoX size={20} />
      </Button>
    </div>
  )
}
