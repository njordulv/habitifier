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
            image={session.user?.user_metadata?.avatar_url}
            className="absolute right-2 top-2 rounded-full flex border border-solid border-slate-500"
          />
        )}
      </div>
    </header>
  )
}
