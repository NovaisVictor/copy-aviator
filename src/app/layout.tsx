import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Copy Aviator',
  description: 'Clique e aprenda a lucrar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark antialiased bg-gradient-to-b from-primary/40 to-black overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
