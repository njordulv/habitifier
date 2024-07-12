import { login } from '@/app/login/actions'
import { SignInHandler } from '@/components/auth/SignInHandler'

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-20 gap-6">
      <SignInHandler formAction={login} />
    </main>
  )
}
