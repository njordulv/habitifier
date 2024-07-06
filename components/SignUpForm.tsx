'use client'

import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { signIn } from 'next-auth/react'
import { auth } from '@/lib/firebase'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '@/components/Form'

export const SignUpForm = () => {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      await sendEmailVerification(user)

      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        throw new Error(res.error)
      }

      toast({
        title: 'Success',
        description:
          'Registration successful! Please check your email for verification.',
      })

      router.replace('/profile')
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An error occurred during signup',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} isLoading={isLoading} buttonText="Sign Up" />
  )
}
