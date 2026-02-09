import { createPlatformClient } from '@adsurf/storefront-sdk'
import Link from 'next/link'

const client = createPlatformClient({
  apiKey: process.env.PLATFORM_API_KEY!,
  baseUrl: process.env.PLATFORM_URL || 'https://adsurf.ai',
})

export default async function HomePage() {
  // Fetch products from the platform
  const { products } = await client.getProducts(8)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Your Brand
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This is your storefront template. Customize it to match your brand.
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  {product.images[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <h3 className="font-medium text-gray-900">{product.title}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
