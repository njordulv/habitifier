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
import { SignUpForm } from '@/components/SignUpForm'

export default function SignUpCard() {
  return (
    <>
      <Card className="w-full max-w-[380px]">
        <CardHeader>
          <CardTitle>Get started</CardTitle>
          <CardDescription>Create your account</CardDescription>
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
        <SignUpForm />
        <CardFooter className="text-xs flex gap-2">
          <span>Already have an account?</span>
          <Link
            href="/signin"
            className="hover:opacity-55 transition-opacity underline"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}
