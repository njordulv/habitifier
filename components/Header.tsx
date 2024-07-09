'use client'

import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/Navbar'
import { ProfilePicture } from '@/components/ProfilePicture'

export const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="flex">
      <Navbar />
      {session && (
        <ProfilePicture
          name={session.user.name}
          email={session.user.email}
          image={session.user.image}
          className="absolute right-2 top-2 rounded-full flex border border-solid border-slate-500"
        />
      )}
    </header>
  )
}
