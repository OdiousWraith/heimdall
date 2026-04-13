import type { Metadata } from 'next'
import { Space_Grotesk, Roboto_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Delta Terminal',
  description: 'Your crypto command center',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${robotoMono.variable}`}>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  )
}