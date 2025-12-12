import { useState } from 'react'
import type { ProviderProps } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useMessages } from '@/hooks/useMessage'
import { createBrowserSupabaseClient } from '@/utils/supabase/client-browser'

export const ProviderButton: React.FC<ProviderProps> = ({
  provider,
  title,
  Icon,
  ...props
}) => {
  const supabase = createBrowserSupabaseClient()
  const [isLoading, setIsLoading] = useState(false)
  const { showMessage } = useMessages()

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${origin}/auth/callback`,
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
    }
  }

  return (
    <Button
      {...props}
      onClick={handleSignIn}
      aria-label={title}
      disabled={isLoading}
      icon={isLoading ? <Spinner size={20} /> : <Icon size={18} />}
    >
      {title}
    </Button>
  )
}
