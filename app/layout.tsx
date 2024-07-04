import type { Metadata } from 'next'
import { siteConfig } from '@/configs/site'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
