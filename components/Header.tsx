'use client'

import { useSession } from '@/hooks/useSession'
import { Navbar } from '@/components/Navbar'
import { ProfilePicture } from '@/components/ProfilePicture'

export const Header = () => {
  const session = useSession()

  return (
    <header>
      <div className="flex">
        <Navbar />
        {session && (
          <ProfilePicture
            name={session.user?.user_metadata?.name}
            email={session.user?.user_metadata?.email}
            image={session.user?.user_metadata?.avatar_url}
            className="absolute right-3 top-3 rounded-full flex border border-solid border-slate-500"
          />
        )}
      </div>
    </header>
  )
}
