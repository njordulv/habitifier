'use client'

import Link from 'next/link'
import { SignOut } from '@/components/SignOut'
import { siteConfig } from '@/configs/site'
import { useSession } from '@/hooks/useSession'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const navItems = siteConfig.nav
const navAuthItems = siteConfig.navAuth

export const Navbar = () => {
  const session = useSession()

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
            <SignOut
              className={`${navigationMenuTriggerStyle()} text-white shadow-none`}
            />
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
