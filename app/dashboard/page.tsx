import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  const { user } = session || {}
  const { name, email } = user || {}

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Profile</h1>
      <h2>{name}</h2>
      <p>{email}</p>
    </main>
  )
}
