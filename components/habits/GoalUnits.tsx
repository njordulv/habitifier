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
  const units = siteConfig.units
  const { goalUnit, setGoalUnit } = useCreateHabitStore()

  return (
    <Select value={goalUnit} onValueChange={setGoalUnit}>
      <SelectTrigger>
        <SelectValue placeholder="glasses" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {units.map((el) => (
            <SelectItem key={el.id} value={el.label}>
              {el.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
