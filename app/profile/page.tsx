import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Image from 'next/image'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  const { user } = session || {}
  const { name, email, image } = user || {}

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Profile</h1>
      <h2>{name}</h2>
      <p>{email}</p>
      {image && (
        <Image
          src={image}
          alt={`${name}'s profile picture`}
          width={100}
          height={100}
          priority
        />
      )}
    </main>
  )
}
