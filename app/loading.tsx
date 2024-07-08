import { Spinner } from '@/components/ui/spinner'

export default function loading() {
  return (
    <main className="flex flex-col items-center place-content-center">
      <Spinner size={36} className="text-primary" />
    </main>
  )
}
