'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMessages } from '@/hooks/useMessage'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { OrFill } from '@/components/auth/OrFill'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/utils/supabase/client'
import { SignInProps } from '@/interfaces'

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(7, 'Password must be at least 7 characters long'),
})

type FormData = z.infer<typeof FormSchema>

export const SignUp = ({ formAction }: SignInProps) => {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const { showMessage } = useMessages()

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
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })

      if (error) throw error

      showMessage('Signed up successfully!', 'success', 'default')
      router.replace('/dashboard')
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
    <Card className="w-full max-w-[380px]">
      <CardHeader>
        <CardTitle>Get started</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <OrFill />
      </CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
          action={formAction}
        >
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
                      autoComplete="current-password"
                      {...field}
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
              {isLoading && <Spinner size={18} />}
              <span>Sign Up</span>
            </Button>
          </CardContent>
        </form>
      </Form>
      <CardFooter className="text-xs flex gap-2">
        <span>Already have an account?</span>
        <Link
          href={'/sign-in'}
          className="hover:opacity-55 transition-opacity underline"
        >
          Sign In
        </Link>
      </CardFooter>
    </Card>
  )
}
