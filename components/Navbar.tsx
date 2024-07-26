'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoSignIn } from 'react-icons/go'
import { SignOut } from '@/components/SignOut'
import { siteConfig } from '@/config/site'
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
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${
                  pathname === item.href ? 'text-primary' : ''
                }`}
              >
                <item.icon size="20" title={item.label} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        {session &&
          navAuthItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    pathname === item.href ? 'text-primary' : ''
                  }`}
                >
                  <item.icon size="20" title={item.label} />
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
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${
                  pathname === '/sign-in' ? 'text-primary' : ''
                }`}
              >
                <GoSignIn size="20" title="Sign In" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
