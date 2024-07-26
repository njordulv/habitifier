'use client'

import { GoPlusCircle } from 'react-icons/go'
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
        onClick={() => router.push('/create')}
      >
        <GoPlusCircle size={60} />
      </Button>
    </>
  )
}
