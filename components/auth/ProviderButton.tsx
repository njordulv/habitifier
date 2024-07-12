// import { useSearchParams, useRouter } from 'next/navigation'
// import { signIn } from 'next-auth/react'
// import { useState } from 'react'
// import { ProviderProps } from '@/interfaces'
// import { Button } from '@/components/ui/button'
// import { Spinner } from '@/components/ui/spinner'
// import { useMessages } from '@/hooks/useMessage'

// export const ProviderButton: React.FC<ProviderProps> = ({
//   provider,
//   title,
//   Icon,
//   ...props
// }) => {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
//   const [isLoading, setIsLoading] = useState(false)
//   const { showMessage } = useMessages()

//   const handleSignIn = async () => {
//     setIsLoading(true)
//     try {
//       const res = await signIn(provider, { callbackUrl, redirect: false })

//       if (res?.error) {
//         showMessage(res.error || 'Sign in error', 'error', 'destructive')
//         setIsLoading(false)
//       } else if (res?.url) {
//         router.push(res.url)
//       }
//     } catch (error) {
//       showMessage(
//         error instanceof Error
//           ? error.message
//           : String(error) || 'Sign in error',
//         'error',
//         'destructive'
//       )
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Button
//       {...props}
//       className="w-full flex gap-2"
//       onClick={handleSignIn}
//       disabled={isLoading}
//       aria-label={title}
//     >
//       {isLoading ? (
//         <Spinner size={20} />
//       ) : (
//         <Icon size={18} aria-hidden="true" />
//       )}
//       <span>{title}</span>
//     </Button>
//   )
// }
