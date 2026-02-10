import { createPlatformClient } from '@adsurf/storefront-sdk'
import { notFound } from 'next/navigation'
import AddToCartSection from './AddToCartSection'

const client = createPlatformClient({
  apiKey: process.env.PLATFORM_API_KEY!,
  baseUrl: process.env.PLATFORM_URL || 'https://adsurf.ai',
})

interface Props {
  params: { handle: string }
}

export default async function ProductPage({ params }: Props) {
  const { product } = await client.getProduct(params.handle)

  if (!product) {
    notFound()
  }

  const mainImage = product.images[0]

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {mainImage ? (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `${product.title} ${i + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <AddToCartSection product={product} />
          </div>
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({ params }: Props) {
  const { product } = await client.getProduct(params.handle)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.title,
    description: product.description,
  }
}
