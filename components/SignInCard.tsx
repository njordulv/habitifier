import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OrFill } from '@/components/OrFill'
import { GoogleBtn } from '@/components/GoogleBtn'
import { SignInForm } from '@/components/SignInForm'

export default function SignInCard() {
  return (
    <>
      <Card className="max-w-[380px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleBtn />
          <OrFill />
        </CardContent>
        <SignInForm />
      </Card>
    </>
  )
}
