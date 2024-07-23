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
      <Button variant="secondary" onClick={minusHandler}>
        <HiOutlineMinus />
      </Button>
      <span
        className={`flex sm:min-w-8 min-w-6 justify-center`}
        style={{ color: color }}
      >
        {goal}
      </span>
      <Button variant="secondary" onClick={plusHandler}>
        <HiOutlinePlus />
      </Button>
    </div>
  )
}
