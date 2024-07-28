import Image from 'next/image'
import { AddHabit } from '@/components/dashboard/AddHabit'

export const NoItems = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h3>There are no tasks yet.</h3>
        <Image
          src={'/images/sleeping-koala.svg'}
          alt="stoth-image"
          className="no-habits-img"
          width={310}
          height={212}
          priority
        ></Image>
        <h3>Time to create a new one!</h3>
        <AddHabit />
      </div>
    </div>
  )
}
