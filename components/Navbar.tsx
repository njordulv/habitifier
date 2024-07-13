'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/sign-out/actions'
import { siteConfig } from '@/configs/site'
import { useSession } from '@/hooks/useSession'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import NavSkeleton from '@/components/NavSkeleton'

const navItems = siteConfig.nav
const navAuthItems = siteConfig.navAuth

export const Navbar = () => {
  const router = useRouter()
  const session = useSession()

  const handleSignOut = async () => {
    await logout()
    router.push('/')
  }

  if (session === undefined) {
    return <NavSkeleton />
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        {session &&
          navAuthItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

        {session ? (
          <NavigationMenuItem>
            <Button
              className={`${navigationMenuTriggerStyle()} text-white shadow-none`}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Link href="/sign-in" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sign In
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
