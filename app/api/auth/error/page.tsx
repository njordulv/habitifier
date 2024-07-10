import AuthError from '@/components/auth/AuthError'

export default async function page() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <AuthError />
    </main>
  )
}
