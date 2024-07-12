import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') || 'An unknown error occurred.'

  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-20 gap-6">
      <h1>Error</h1>
      <p>{message}</p>
    </main>
  )
}
