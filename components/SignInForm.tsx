'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormEventHandler } from 'react'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export const SignInForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const handlerSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (res && !res.error) {
      router.push('/profile')
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
      })
    }
  }

  return (
    <form onSubmit={handlerSubmit} className="relative">
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email
          </Label>
          <Input id="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-muted-foreground">
            Password
          </Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardContent className="flex flex-col justify-between">
        <Button variant="default" className="w-full" type="submit">
          Sign In
        </Button>
      </CardContent>
    </form>
  )
}