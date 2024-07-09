'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMessages } from '@/hooks/useMessage'
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

export const SignInHandler = () => {
  const router = useRouter()
  const { showMessage } = useMessages()
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
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (res && !res.error) {
        showMessage('Signed in successfully!', 'success', 'primary')
        router.replace('/profile')
      } else {
        throw new Error(res?.error || 'Failed to sign in')
      }
    } catch (error: any) {
      setIsLoading(false)
      showMessage(
        error.message || 'An error occurred during sign in',
        'error',
        'destructive'
      )
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
                    error={!!form.formState.errors.email}
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
                    type="password"
                    placeholder="••••••••••••"
                    autoComplete="password"
                    {...field}
                    error={!!form.formState.errors.email}
                  />
                </FormControl>
                <FormMessage className="absolute !m-0" />
              </FormItem>
            )}
          />
        </CardContent>
        <CardContent className="flex flex-col justify-between">
          <Button variant="default" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size={20} /> : 'Sign In'}
          </Button>
        </CardContent>
      </form>
    </Form>
  )
}
