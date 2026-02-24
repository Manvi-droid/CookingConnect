import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
// We need to support the stylistic variations of Fraunces (italic, black/900 etc)
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces'
})

export const metadata: Metadata = {
  title: 'RecipeConnect',
  description: 'Share your culinary creation with the community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased text-white bg-[#0d0d0d] h-full`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
