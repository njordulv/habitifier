import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'

interface Props {
  provider: string
  title: string
  Icon: IconType
}

export const ProviderButton = ({ provider, title, Icon }: Props) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  const githubHandler = () => {
    signIn(provider, { callbackUrl })
  }

  return (
    <Button variant="secondary" className="w-full" onClick={githubHandler}>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <span>{title}</span>
    </Button>
  )
}
