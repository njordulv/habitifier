'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState, FormEventHandler } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '@/components/auth/Form'

export const SignInFormHandler = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res && !res.error) {
        toast({
          title: 'Success',
          description: 'Signed in successfully!',
        })
        router.replace('/profile')
      } else {
        throw new Error(res?.error || 'Failed to sign in')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An error occurred during sign in',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form onSubmit={handleSubmit} isLoading={isLoading} buttonText="Sign In" />
  )
}
