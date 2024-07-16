import { List } from '@/components/habits/List'

export default async function HabitsPage() {
  return (
    <main className="flex flex-col items-center justify-start p-4 sm:p-24 gap-6">
      <h2>Your current habits</h2>
      <List />
    </main>
  )
}
