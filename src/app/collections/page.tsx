import { createPlatformClient } from '@adsurf/storefront-sdk'

const client = createPlatformClient({
  apiKey: process.env.PLATFORM_API_KEY!,
  baseUrl: process.env.PLATFORM_URL || 'https://adsurf.ai',
})

export default async function CollectionsPage() {
  const { collections } = await client.getCollections()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Collections</h1>

        {collections.length === 0 ? (
          <p className="text-gray-500">No collections found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <a
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group"
              >
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {collection.image ? (
                    <img
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {collection.title}
                    </div>
                  )}
                </div>
                <h2 className="font-medium text-gray-900 group-hover:underline">
                  {collection.title}
                </h2>
                {collection.description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {collection.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export const metadata = {
  title: 'Collections',
  description: 'Browse our product collections.',
}
