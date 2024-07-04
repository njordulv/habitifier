import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { OrFill } from '@/components/OrFill'
import { GoogleBtn } from '@/components/GoogleBtn'
import { GithubBtn } from '@/components/GithubBtn'
import { SignInForm } from '@/components/SignInForm'

export default function SignInCard() {
  return (
    <>
      <Card className="w-full max-w-[380px]">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleBtn />
          <GithubBtn />
          <OrFill />
        </CardContent>
        <SignInForm />
        <CardFooter className="text-xs flex gap-2">
          <span>{`Don't have an account?`}</span>
          <Link
            href="/signup"
            className="hover:opacity-55 transition-opacity underline"
          >
            Sign Up Now
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}
