import { toast, ToastT } from 'sonner'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
export type ToastColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'destructive'

export const useMessages = () => {
  const showMessage = (
    message: string,
    variant: ToastVariant = 'default',
    color: ToastColor = 'default'
  ) => {
    const toastOptions: Partial<ToastT> = {
      duration: 3000,
      className: `toast-${color}`,
    }

    switch (variant) {
      case 'success':
        toast.success(message, toastOptions)
        break
      case 'error':
        toast.error(message, toastOptions)
        break
      case 'warning':
        toast.warning(message, toastOptions)
        break
      case 'info':
        toast.info(message, toastOptions)
        break
      default:
        toast(message, toastOptions)
    }
  }

  return { showMessage }
}
