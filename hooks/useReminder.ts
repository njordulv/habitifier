import { toast } from 'sonner'

export const useReminder = () => {
  const showReminder = (message: any) => {
    const toastOptions = {
      duration: 10000,
      className: 'toast-default',
    }

    toast(message, toastOptions)
  }

  return { showReminder }
}
