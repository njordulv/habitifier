import { GoClock } from 'react-icons/go'
import { formatTimeForDisplay } from '@/components/ui/time-picker-utils'

interface Props {
  list: string[]
  color: string
}

export const Reminders: React.FC<Props> = ({ list, color }) => {
  if (list.length === 0) return null

  return (
    <div className="reminders-list">
      {list.map((time: string, index: number) => (
        <span key={index} className="flex items-center gap-1">
          <span
            className={`${color} bg-dark flex items-center gap-1 px-1 py-1 rounded-md`}
          >
            <GoClock color={color} />
          </span>
          {formatTimeForDisplay(time) || 'Invalid time'}
        </span>
      ))}
    </div>
  )
}
