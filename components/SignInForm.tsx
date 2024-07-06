'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState, FormEventHandler } from 'react'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Spinner } from '@/components/ui/spinner'

export const SignInForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handlerSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
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
        router.push('/profile')
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
    <form onSubmit={handlerSubmit} className="relative">
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@provider.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-muted-foreground">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="current-password"
            required
          />
        </div>
      </CardContent>
      <CardContent className="flex flex-col justify-between">
        <Button
          variant="default"
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Sign In'}
        </Button>
      </CardContent>
    </form>
  )
}
