import dynamic from 'next/dynamic'
import type { Metadata, Viewport } from 'next'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { Spinner } from '@/components/ui/spinner'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'

const Notifier = dynamic(
  () =>
    import('@/components/habits/parts/Notifier').then((mod) => mod.Notifier),
  {
    loading: () => <Spinner size={18} />,
    ssr: false,
  }
)

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  generator: siteConfig.generator,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  icons: siteConfig.icons,
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: siteConfig.viewport.width,
  initialScale: siteConfig.viewport.initialScale,
  minimumScale: siteConfig.viewport.minimumScale,
  viewportFit: siteConfig.viewport.viewportFit,
  userScalable: siteConfig.viewport.userScalable,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <Header />
        <main className="flex flex-col items-center justify-center px-4 sm:px-24 py-6 gap-6">
          {children}
        </main>
        <Notifier />
        <Toaster />
      </body>
    </html>
  )
}
