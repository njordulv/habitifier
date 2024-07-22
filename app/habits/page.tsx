import { List2 } from '@/components/habits/List2'

export default async function HabitsPage() {
  return (
    <main className="flex flex-col items-center justify-start p-4 sm:p-24 gap-6">
      <h2>Your current habits</h2>
      <List2 />
    </main>
  )
}
