import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { GoalProps } from '@/interfaces'

export const DailyGoal = ({ goal, setGoal }: GoalProps) => {
  const plusHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setGoal(goal + 1)
  }

  const minusHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (goal > 0) {
      setGoal(goal - 1)
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <Button variant="ghost" onClick={minusHandler}>
        <HiOutlineMinus />
      </Button>
      <span className="flex min-w-8 justify-center">{goal}</span>
      <Button variant="ghost" onClick={plusHandler}>
        <HiOutlinePlus />
      </Button>
    </div>
  )
}
