import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/configs/site'
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
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
