import { Form } from '@/components/habits/Form'
import { List } from '@/components/habits/List'

export default function page() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-20 gap-6">
      <h1>Habits</h1>
      <Form />
      <List />
    </main>
  )
}
