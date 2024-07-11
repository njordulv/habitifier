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
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(7, 'Password must be at least 7 characters long'),
})

type FormData = z.infer<typeof FormSchema>

export const SignUpHandler = () => {
  const router = useRouter()
  const { showMessage } = useMessages()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      showMessage(
        'Registration successful! Please check your email for verification.',
        'success',
        'primary'
      )

      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (res?.error) {
        throw new Error(res.error)
      }

      router.replace('/dashboard')
    } catch (error: any) {
      setIsLoading(false)
      showMessage(
        error.message || 'An error occurred during signup',
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Awesome You"
                    {...field}
                    error={!!form.formState.errors.name}
                  />
                </FormControl>
                <FormMessage className="absolute !m-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@provider.com"
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
                    placeholder="••••••••••••"
                    autoComplete="new-password"
                    {...field}
                    type="password"
                    error={!!form.formState.errors.password}
                  />
                </FormControl>
                <FormMessage className="absolute !m-0" />
              </FormItem>
            )}
          />
        </CardContent>
        <CardContent className="flex flex-col justify-between">
          <Button variant="outline" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size={20} /> : 'Sign Up'}
          </Button>
        </CardContent>
      </form>
    </Form>
  )
}
