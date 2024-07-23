import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

export const DailyGoal = () => {
  const { goal, increaseGoal, decreaseGoal, color } = useCreateHabitStore()
  const plusHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    increaseGoal()
  }

  const minusHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    decreaseGoal()
  }

  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="secondary"
        onClick={minusHandler}
        className="w-full px-0 text-lg"
      >
        <HiOutlineMinus />
      </Button>
      <span
        className={`flex w-full text-lg bg-secondary/30 h-9 rounded-md items-center justify-center tracking-wider`}
        style={{ color: color }}
      >
        {goal}
      </span>
      <Button
        variant="secondary"
        onClick={plusHandler}
        className="w-full px-0 text-lg"
      >
        <HiOutlinePlus />
      </Button>
    </div>
  )
}
