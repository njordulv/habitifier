import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

export const DailyGoal = () => {
  const { goal, increaseGoal, decreaseGoal } = useCreateHabitStore()
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
      <span className="flex min-w-8 justify-center">{goal}</span>
      <Button variant="secondary" onClick={plusHandler}>
        <HiOutlinePlus />
      </Button>
    </div>
  )
}
