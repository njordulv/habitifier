import { useState } from 'react'
import { ProviderProps } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useMessages } from '@/hooks/useMessage'
import { createClient } from '@/utils/supabase/client'

export const ProviderButton: React.FC<ProviderProps> = ({
  provider,
  title,
  Icon,
  ...props
}) => {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const { showMessage } = useMessages()

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : String(error) || 'Sign in error',
        'error',
        'destructive'
      )
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
      {isLoading ? (
        <Spinner size={20} />
      ) : (
        <Icon size={18} aria-hidden="true" />
      )}
      <span>{title}</span>
    </Button>
  )
}
