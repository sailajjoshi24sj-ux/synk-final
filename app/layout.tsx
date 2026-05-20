import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LoadingScreen } from '@/components/loading-screen'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Synk Corp | Premium AI & Software Development Agency',
  description: 'Building Intelligent Digital Experiences. We build powerful websites, mobile apps, AI systems, and automation tools that help businesses grow faster. Based in Nepal.',
  keywords: ['AI development', 'software agency', 'web development', 'mobile apps', 'AI chatbots', 'automation', 'Nepal', 'Synk Corp'],
  authors: [{ name: 'Synk Corp' }],
  creator: 'Synk Corp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synkcorp.com',
    title: 'Synk Corp | Premium AI & Software Development Agency',
    description: 'Building Intelligent Digital Experiences. We build powerful websites, mobile apps, AI systems, and automation tools that help businesses grow faster.',
    siteName: 'Synk Corp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synk Corp | Premium AI & Software Development Agency',
    description: 'Building Intelligent Digital Experiences. We build powerful websites, mobile apps, AI systems, and automation tools.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
  // viewport-fit=cover lets env(safe-area-inset-*) work on iPhone notch/dynamic island
  viewportFit: 'cover',
  // Prevent iOS auto-zoom on input focus which breaks the app-like feel
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen overflow-x-hidden">
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
