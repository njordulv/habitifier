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
import { createBrowserClient } from '@supabase/ssr'

function getBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) throw new Error('Missing env')
  return createBrowserClient(supabaseUrl, supabaseKey)
}

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(7, 'Password must be at least 7 characters'),
})

type FormData = z.infer<typeof FormSchema>

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter()

  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)
  const { showMessage } = useMessages()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  type SignInFn = typeof supabase.auth.signInWithPassword
  type SignUpFn = typeof supabase.auth.signUp
  type AuthResult = Awaited<ReturnType<SignInFn | SignUpFn>>

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)

    try {
      let result: AuthResult

      if (mode === 'sign-in') {
        result = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })
      } else {
        result = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        })
      }

      const { error } = result
      if (error) throw error

      showMessage(
        mode === 'sign-in'
          ? 'Signed in successfully!'
          : 'Signed up successfully!',
        'success',
        'default'
      )

      router.replace('/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false)
        showMessage(error.message, 'error', 'destructive')
      }
    }
  }

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>
          {mode === 'sign-in' ? 'Sign in to Habitifier' : 'Get started'}
        </CardTitle>
        <CardDescription>
          {mode === 'sign-in'
            ? 'Welcome back! Sign in to your account'
            : 'Create your account'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ProviderButton
          provider="google"
          title="Continue with Google"
          Icon={SiGoogle}
          variant="secondary"
        />
        <ProviderButton
          provider="github"
          title="Continue with Github"
          Icon={SiGithub}
          variant="secondary"
        />
        <OrFill />
      </CardContent>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      type="password"
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute !m-0" />
                </FormItem>
              )}
            />
          </CardContent>

          <CardContent>
            <Button
              type="submit"
              variant="outline"
              disabled={isLoading}
              icon={isLoading && <Spinner size={18} />}
            >
              {mode === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>
          </CardContent>
        </form>
      </Form>

      <CardFooter className="text-xs flex gap-2">
        {mode === 'sign-in' ? (
          <>
            <span>Don't have an account?</span>
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <Link href="/sign-in" className="underline">
              Sign In
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
