'use client'

import Link from 'next/link'
// import { useSession, signOut } from 'next-auth/react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'

const navItems = siteConfig.nav
const navAuthItems = siteConfig.navAuth

export const Navbar = () => {
  // const { data: session } = useSession()

  // const handleSignOut = () => signOut({ callbackUrl: '/' })

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
        {/* {session && (
          <>
            {navAuthItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <Button
                className={`${navigationMenuTriggerStyle()} text-white shadow-none`}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </NavigationMenuItem>
          </>
        )}
        {!session && (
          <NavigationMenuItem>
            <Link href="/sign-in" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sign In
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )} */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
