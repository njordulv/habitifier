import { siteConfig } from '@/config/site'
import { DayTimeProps } from '@/interfaces'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const DayTime: React.FC<DayTimeProps> = ({
  selectedTime,
  setSelectedTime,
}) => {
  const dayTime = siteConfig.dayTime

  return (
    <Select value={selectedTime} onValueChange={setSelectedTime}>
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
