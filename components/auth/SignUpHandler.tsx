'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useToast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(7, 'Password must be at least 7 characters long'),
})

type FormData = z.infer<typeof FormSchema>

export const SignUpHandler = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const user = userCredential.user

      await sendEmailVerification(user)

      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <CardContent>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@provider.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute !m-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••••••"
                    autoComplete="password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage className="absolute !m-0" />
              </FormItem>
            )}
          />
        </CardContent>
        <CardContent className="flex flex-col justify-between">
          <Button
            variant="default"
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Sign Up'}
          </Button>
        </CardContent>
      </form>
    </Form>
  )
}
