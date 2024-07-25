import { List } from '@/components/habits/List'

export default async function HabitsPage() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen gap-6">
      <h2>Your current habits</h2>
      <List />
    </section>
  )
}
