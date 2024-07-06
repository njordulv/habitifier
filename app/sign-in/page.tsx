import { AuthCard } from '@/components/auth/AuthCard'
import { SignInFormHandler } from '@/components/auth/SignInFormHandler'

export default async function SignIn() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-6">
      <AuthCard
        title="Sign in to Habitifier"
        description="Welcome back! Sign in to your account"
        formComponent={<SignInFormHandler />}
        accountText="Don't have an account?"
        linkUrl="Sign Up"
        linkText="/sign-up"
      />
    </main>
  )
}
