import { useId } from 'react'
import { Spinner } from '@/components/ui/spinner'

export default function loading() {
  const id = useId()

  return <Spinner id={id} size={36} className="text-primary" />
}
