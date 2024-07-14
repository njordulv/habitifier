import AuthError from '@/components/auth/AuthError'

export default async function ErrorPage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <AuthError />
    </main>
  )
}