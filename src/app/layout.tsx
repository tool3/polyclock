import '~/css/global.scss'

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import { siteURL } from '~/lib/constants'

import { AppHooks } from './app-hooks'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: {
    default: 'Polyclock | Tal Hayut',
    template: '%s | Tal Hayut'
  },
  metadataBase: siteURL,
  description: `3D display clock`,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'polyclock',
    creator: 'talhayut',
    siteId: 'polyclock'
  }
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  viewportFit: 'cover',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          {children}
          <AppHooks />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
