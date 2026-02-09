import type { Metadata } from 'next'
import { CartDrawer } from '@adsurf/storefront-sdk'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Brand - Storefront',
  description: 'Powered by Adsurf',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleCheckout = () => {
    // TODO: Implement checkout redirect
    window.location.href = '/checkout'
  }

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <CartDrawer onCheckout={handleCheckout} />
      </body>
    </html>
  )
}
