import { useState } from 'react'
import { createBrowserSupabaseClient } from '@/utils/supabase/client-browser'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useMessages } from '@/hooks/useMessage'

const supabase = createBrowserSupabaseClient()

interface Props {
  habitId: number
  onSuccess: () => void
}

export const RemoveHabit = ({ habitId, onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { showMessage } = useMessages()

  const deleteHabit = async () => {
    setIsLoading(true)
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId)
      .select()

    if (error) {
      setIsLoading(false)
      showMessage(error.message, 'error', 'destructive')
      return
    }

    showMessage('Habit deleted successfully', 'success', 'accent')
    onSuccess()
  }

  return (
    <Button
      variant="destructive"
      onClick={deleteHabit}
      disabled={isLoading}
      icon={isLoading && <Spinner size={18} />}
    >
      Delete
    </Button>
  )
}
