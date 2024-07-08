import { AuthCard } from '@/components/auth/AuthCard'
import { SignUpHandler } from '@/components/auth/SignUpHandler'

export default async function SignUp() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-24 gap-6">
      <AuthCard
        title="Get started"
        description="Create your account"
        formComponent={<SignUpHandler />}
        accountText="Already have an account?"
        linkUrl="/sign-in"
        linkText="Sign In"
      />
    </main>
  )
}
