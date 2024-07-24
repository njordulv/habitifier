import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'
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
        <Header />
        <main className="flex flex-col items-center justify-start px-4 sm:px-24 py-6 gap-6">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
