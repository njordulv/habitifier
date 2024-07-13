import { Form } from '@/components/habits/Form'
import { List } from '@/components/habits/List'

export default function HabitsPage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Form />
      <List />
    </main>
  )
}
