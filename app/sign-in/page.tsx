import { AuthCard } from '@/components/auth/AuthCard'
import { SignInHandler } from '@/components/auth/SignInHandler'

export default async function SignIn() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-20 gap-6">
      <AuthCard
        title="Sign in to Habitifier"
        description="Welcome back! Sign in to your account"
        formComponent={<SignInHandler />}
        accountText="Don't have an account?"
        linkUrl="/sign-up"
        linkText="Sign Up"
      />
    </main>
  )
}
