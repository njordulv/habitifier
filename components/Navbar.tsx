'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { logout } from '@/app/sign-out/actions'
import { siteConfig } from '@/configs/site'
import { createClient } from '@/utils/supabase/client'
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
  const supabase = createClient()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setIsAuthenticated(!!session)
      } catch (error) {
        console.error('Error checking auth status:', error)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await logout()
    setIsAuthenticated(false)
    router.push('/')
  }

  if (isLoading) {
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

        {isAuthenticated &&
          navAuthItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

        {isAuthenticated ? (
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
