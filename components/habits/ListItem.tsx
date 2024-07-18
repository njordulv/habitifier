import React from 'react'
import { HabitProps } from '@/interfaces'
import { iconsLibrary } from '@/config/icons'

export const ListItem: React.FC<HabitProps> = (habit) => {
  const IconComponent =
    iconsLibrary.habitIcons.find((i) => i.label === habit.icon)?.icon ||
    iconsLibrary.habitIcons[0].icon

  return (
    <li className={habit.color}>
      <div className="border rounded-md p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <IconComponent size={24} className={`${habit.color}`} />
          <h3 className="text-lg font-semibold text-white">{habit.name}</h3>
        </div>
        {habit.description && (
          <div className="text-sm text-muted-foreground">
            {habit.description}
          </div>
        )}
        {habit.days && (
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs ${habit.color} bg-dark px-2 py-1 rounded-lg capitalize`}
            >
              {habit.days}
            </span>
          </div>
        )}
        <div className="flex gap-2 justify-between">
          {habit.time_of_day && (
            <div className="text-xs text-white flex items-center gap-1">
              <span>
                {habit.time_of_day === 'everytime'
                  ? `Repeat ${habit.time_of_day}`
                  : `Repeat every ${habit.time_of_day}`}
              </span>
            </div>
          )}
          {habit.daily_goal && (
            <div className="flex items-center gap-[2px] text-sm text-muted-foreground">
              <span className={habit.color}>0</span>
              <span className="color-dark">/</span>
              <span className="color-dark">{habit.daily_goal}</span>
              <span>&nbsp;{habit.goal_units}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
