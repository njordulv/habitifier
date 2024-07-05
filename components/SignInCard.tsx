'use client'

import Link from 'next/link'
import { SiGoogle, SiGithub } from 'react-icons/si'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { OrFill } from '@/components/OrFill'
import { ProviderButton } from '@/components/ProviderButton'
import { SignInForm } from '@/components/SignInForm'

export default function SignInCard() {
  return (
    <>
      <Card className="w-full max-w-[380px]">
        <CardHeader>
          <CardTitle>Sign in to Habitifier</CardTitle>
          <CardDescription>
            Welcome back! Sign in to your account
          </CardDescription>
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
            title="Continue with GitHub"
            Icon={SiGithub}
            variant={'secondary'}
          />
          <OrFill />
        </CardContent>
        <SignInForm />
        <CardFooter className="text-xs flex gap-2">
          <span>{`Don't have an account?`}</span>
          <Link
            href="/signup"
            className="hover:opacity-55 transition-opacity underline"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}
