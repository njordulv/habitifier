'use client'

import { SlPlus } from 'react-icons/sl'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const AddHabit = () => {
  const router = useRouter()

  return (
    <>
      <Button
        type="submit"
        variant="ghost"
        className="rounded-full w-20 h-20 p-0"
        onClick={() => router.push('/add')}
      >
        <SlPlus size={60} />
      </Button>
      <p>Add New Habit</p>
    </>
  )
}
