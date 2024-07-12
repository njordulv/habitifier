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
import { OrFill } from '@/components/auth/OrFill'
// import { ProviderButton } from '@/components/auth/ProviderButton'
import { AuthCardProps } from '@/interfaces'

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  formComponent,
  accountText,
  linkUrl,
  linkText,
}) => {
  return (
    <Card className="w-full max-w-[380px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <ProviderButton
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
        /> */}
        <OrFill />
      </CardContent>
      {formComponent}
      <CardFooter className="text-xs flex gap-2">
        <span>{accountText}</span>
        <Link
          href={linkUrl}
          className="hover:opacity-55 transition-opacity underline"
        >
          {linkText}
        </Link>
      </CardFooter>
    </Card>
  )
}
