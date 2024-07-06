import { AuthCard } from '@/components/AuthCard'
import { SignUpFormHandler } from '@/components/SignUpFormHandler'

export default async function SignUp() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-6">
      <AuthCard
        title="Get started"
        description="Create your account"
        formComponent={<SignUpFormHandler />}
        accountText="Already have an account?"
        linkUrl="Sign In"
        linkText="/sign-in"
      />
    </main>
  )
}
