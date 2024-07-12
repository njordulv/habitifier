import { login } from '@/app/sign-in/actions'
import { SignIn } from '@/components/auth/SignIn'

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-20 gap-6">
      <SignIn formAction={login} />
    </main>
  )
}
