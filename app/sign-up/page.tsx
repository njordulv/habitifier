import { signup } from '@/app/sign-up/actions'
import { SignUp } from '@/components/auth/SignUp'

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-20 gap-6">
      <SignUp formAction={signup} />
    </main>
  )
}
