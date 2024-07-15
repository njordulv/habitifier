import { AddForm } from '@/components/habits/AddForm'
import { List } from '@/components/habits/List'

export default async function HabitsPage() {
  return (
    <main className="flex flex-col items-center justify-between p-4 sm:p-24">
      <AddForm />
      <List />
    </main>
  )
}
