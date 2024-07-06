'use client'

import { useSession, signOut } from 'next-auth/react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { siteConfig } from '@/configs/site'

const navItems = siteConfig.nav

export const Navbar = () => {
  const { data: session } = useSession()

  const handleSignOut = () => signOut({ callbackUrl: '/' })

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink
              href={item.href}
              className={navigationMenuTriggerStyle()}
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        {session && (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/profile"
                className={navigationMenuTriggerStyle()}
              >
                Profile
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="javascript:"
                className={navigationMenuTriggerStyle()}
                onClick={handleSignOut}
              >
                Sign Out
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
        {!session && (
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/sign-in"
              className={navigationMenuTriggerStyle()}
            >
              Sign In
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
