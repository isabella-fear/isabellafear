import './global.css'
import type { Metadata, Viewport } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { profile } from './content/profile'

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: profile.name, template: '%s | ' + profile.name },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.linkedIn }],
  alternates: { canonical: '/' },
  openGraph: {
    title: profile.name,
    description: profile.description,
    url: profile.url,
    siteName: profile.name,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: profile.name }],
  },
  twitter: { card: 'summary_large_image', title: profile.name, description: profile.description, images: ['/og'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#3d5145' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <div className="site-shell">
          <Navbar />
          <main id="content">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
