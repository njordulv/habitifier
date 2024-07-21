import React from 'react'
import { HabitProps } from '@/interfaces'
import { iconsLibrary } from '@/config/icons'
import { PiAlarmLight } from 'react-icons/pi'
import { formatTime } from '../ui/time-picker-utils'

export const ListItem: React.FC<HabitProps> = (habit) => {
  const IconComponent =
    iconsLibrary.habitIcons.find((i) => i.label === habit.icon)?.icon ||
    iconsLibrary.habitIcons[0].icon

  return (
    <li className={habit.color}>
      <div className="border rounded-md p-5 gap-5">
        <div className="grid grid-flow-row-dense grid-cols-[1fr_11fr_2fr] items-center gap-4">
          <IconComponent size={30} className={`${habit.color}`} />
          <div className="flex flex-col gap-1">
            <h3 className="text-md font-medium text-white">{habit.name}</h3>
            <div className="flex flex-wrap gap-[2px]">
              {habit.days.map((day) => (
                <span
                  key={day}
                  className={`text-xs ${habit.color} bg-dark px-2 py-1 rounded-lg capitalize`}
                >
                  {day}
                </span>
              ))}
            </div>
            {habit.time_of_day && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span>
                  {habit.time_of_day === 'anytime'
                    ? `Repeat ${habit.time_of_day}`
                    : `Repeat every ${habit.time_of_day}`}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end justify-end text-sm text-muted-foreground">
            {habit.goal && (
              <>
                <div>
                  <span className={habit.color}>0</span>
                  <span className="color-dark">/{habit.goal}</span>
                </div>
                <div>&nbsp;{habit.units}</div>
              </>
            )}
            {habit.reminder && (
              <div className="flex flex-col text-sm text-muted-foreground">
                {habit.reminder.map((time: string, index: number) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 color-dark"
                  >
                    <PiAlarmLight color={habit.color} /> {formatTime(time)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
