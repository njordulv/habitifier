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

export const GoalUnits = () => {
  const goalUnits = siteConfig.goalUnits
  const { units, setUnits } = useCreateHabitStore()

  return (
    <Select value={units} onValueChange={setUnits}>
      <SelectTrigger>
        <SelectValue placeholder="glasses" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {goalUnits.map((el) => (
            <SelectItem key={el.id} value={el.label}>
              {el.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
