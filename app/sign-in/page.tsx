import SignInCard from '@/components/SignInCard'

export default async function page() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-6">
      <SignInCard />
    </main>
  )
}
