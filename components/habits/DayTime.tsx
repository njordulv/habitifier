import { siteConfig } from '@/config/site'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const DayTime = () => {
  const dayTime = siteConfig.dayTime
  const { timeOfDay, setTimeOfDay } = useCreateHabitStore()

  return (
    <Select value={timeOfDay} onValueChange={setTimeOfDay}>
      <SelectTrigger>
        <SelectValue placeholder="Everytime" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {dayTime.map((el) => (
            <SelectItem key={el.id} value={el.id}>
              {el.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
