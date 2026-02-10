import { createPlatformClient } from '@adsurf/storefront-sdk'

const client = createPlatformClient({
  apiKey: process.env.PLATFORM_API_KEY!,
  baseUrl: process.env.PLATFORM_URL || 'https://adsurf.ai',
})

export default async function ProductsPage() {
  const { products } = await client.getProducts()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const mainImage = product.images[0]
              const mainVariant = product.variants[0]

              return (
                <a
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {mainImage ? (
                      <img
                        src={mainImage.url}
                        alt={mainImage.altText || product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <h2 className="font-medium text-gray-900 group-hover:underline">
                    {product.title}
                  </h2>
                  {mainVariant && (
                    <p className="text-gray-600 mt-1">
                      ${mainVariant.price.toFixed(2)} {mainVariant.currency}
                    </p>
                  )}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

export const metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of products.',
}
