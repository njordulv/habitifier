import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { ProviderProps } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/use-toast'

export const ProviderButton: React.FC<ProviderProps> = ({
  provider,
  title,
  Icon,
  ...props
}) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const res = await signIn(provider, { callbackUrl, redirect: false })

      if (res?.error) {
        toast({
          title: 'Sign in error:',
          description: res.error,
        })
      }
    } catch (error) {
      toast({
        title: 'Sign in error:',
        description: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      {...props}
      className="w-full flex gap-2"
      onClick={handleSignIn}
      disabled={isLoading}
      aria-label={title}
    >
      {isLoading ? <Spinner /> : <Icon size={18} aria-hidden="true" />}
      <span>{title}</span>
    </Button>
  )
}
