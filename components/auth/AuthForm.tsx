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
import { createBrowserSupabaseClient } from '@/utils/supabase/client-browser'

// ---------- Schema ----------
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
  const supabase = createBrowserSupabaseClient()
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
      if (mode === 'sign-in') {
        // ---------- SIGN IN ----------
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })

        if (error) throw error

        if (!data.session) {
          // email confirmation required
          showMessage('Please confirm your email before signing in.', 'info')
          setIsLoading(false)
          return
        }
      } else {
        // ---------- SIGN UP ----------
        const { error: signUpError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        })

        if (signUpError) throw signUpError

        showMessage('Signed up successfully!', 'success', 'default')

        // try login user after sign up
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          })

        if (loginError || !loginData.session) {
          showMessage('Please confirm your email before logging in.', 'info')
          setIsLoading(false)
          return
        }
      }

      // ---------- REDIRECT ----------
      router.replace('/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        showMessage(error.message, 'error', 'destructive')
        setIsLoading(false)
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
