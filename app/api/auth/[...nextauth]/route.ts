import nextAuth from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }
