import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ProviderProps } from '@/interfaces'

export const ProviderButton: React.FC<ProviderProps> = ({
  provider,
  title,
  Icon,
  ...props
}) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  const handleSignIn = () => {
    signIn(provider, { callbackUrl })
  }

  return (
    <Button {...props} className="w-full flex gap-2" onClick={handleSignIn}>
      {Icon && <Icon size={18} />}
      <span>{title}</span>
    </Button>
  )
}
