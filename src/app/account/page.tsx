'use client'

import { CustomerPortal } from '@adsurf/storefront-sdk'

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CustomerPortal
          loginUrl="/account/login"
          onLogout={() => {
            // Optionally redirect after logout
            window.location.href = '/'
          }}
        />
      </div>
    </main>
  )
}
