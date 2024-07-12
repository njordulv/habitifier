'use client'

import Link from 'next/link'
import { SiGoogle, SiGithub } from 'react-icons/si'
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
import { ProviderButton } from '@/components/auth/ProviderButton'
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

export const SignIn = ({ formAction }: SignInProps) => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) throw error

      showMessage('Signed in successfully!', 'success', 'default')
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
        <CardTitle>Sign in to Habitifier</CardTitle>
        <CardDescription>Welcome back! Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <ProviderButton
          provider={'google'}
          title="Continue with Google"
          Icon={SiGoogle}
          variant={'secondary'}
        />
        <ProviderButton
          provider={'github'}
          title="Continue with Github"
          Icon={SiGithub}
          variant={'secondary'}
        />
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
              <span>Sign In</span>
            </Button>
          </CardContent>
        </form>
      </Form>
      <CardFooter className="text-xs flex gap-2">
        <span>{`Don't have an account?`}</span>
        <Link
          href={'/sign-up'}
          className="hover:opacity-55 transition-opacity underline"
        >
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  )
}
