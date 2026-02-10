import { createPlatformClient } from '@adsurf/storefront-sdk'
import { notFound } from 'next/navigation'

const client = createPlatformClient({
  apiKey: process.env.PLATFORM_API_KEY!,
  baseUrl: process.env.PLATFORM_URL || 'https://adsurf.ai',
})

interface Props {
  params: { handle: string }
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await client.getCollection(params.handle)

  if (!collection) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Collection Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-gray-600 max-w-2xl">{collection.description}</p>
          )}
        </div>

        {/* Products Grid */}
        {!collection.products || collection.products.length === 0 ? (
          <p className="text-gray-500">No products in this collection.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collection.products.map((product) => {
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

export async function generateMetadata({ params }: Props) {
  const { collection } = await client.getCollection(params.handle)

  if (!collection) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: collection.title,
    description: collection.description || `Browse the ${collection.title} collection.`,
  }
}
