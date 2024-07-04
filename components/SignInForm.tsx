'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormEventHandler } from 'react'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const SignInForm = () => {
  const router = useRouter()

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
      console.log(res)
    }
  }

  return (
    <form onSubmit={handlerSubmit}>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password:</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default" className="w-full" type="submit">
          Create account
        </Button>
      </CardFooter>
    </form>
  )
}
