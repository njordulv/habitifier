import { CreateForm } from '@/components/habits/CreateForm'

export default async function CreatePage() {
  return (
    <main className="flex flex-col items-center justify-start px-4 sm:px-24 py-6 gap-6">
      <CreateForm />
    </main>
  )
}
