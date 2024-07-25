import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { useMessages } from '@/hooks/useMessage'

const supabase = createClient()

interface Props {
  habitId: number
  onSuccess: () => void
}

export const DeleteHabit = ({ habitId, onSuccess }: Props) => {
  const { showMessage } = useMessages()

  const deleteHabit = async () => {
    const { data, error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId)
      .select()

    if (error) {
      showMessage(error.message, 'error', 'destructive')
      return
    }

    showMessage('Habit deleted successfully', 'success', 'accent')
    onSuccess()
  }

  return (
    <Button variant="destructive" onClick={deleteHabit}>
      Delete
    </Button>
  )
}
