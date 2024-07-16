import { CreateForm } from '@/components/habits/CreateForm'

export default async function CreatePage() {
  return (
    <main className="flex flex-col items-center justify-between p-4 sm:p-24 gap-6">
      <CreateForm />
    </main>
  )
}
