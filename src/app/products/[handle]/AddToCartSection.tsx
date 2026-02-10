'use client'

import { useState } from 'react'
import { useCart, AddToCartButton, type Product } from '@adsurf/storefront-sdk'

interface Props {
  product: Product
}

export default function AddToCartSection({ product }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id)
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)

  return (
    <div className="space-y-6">
      {/* Price */}
      {selectedVariant?.price && (
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${parseFloat(selectedVariant.price.amount).toFixed(2)}
          </span>
          {selectedVariant.compareAtPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
            </span>
          )}
        </div>
      )}

      {/* Variant Selection */}
      {product.variants.length > 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <select
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title} - ${parseFloat(variant.price.amount).toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add to Cart */}
      {selectedVariant && (
        <AddToCartButton
          product={product}
          variant={selectedVariant}
          className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        />
      )}

      {/* Out of Stock */}
      {selectedVariant && !selectedVariant.availableForSale && (
        <p className="text-red-600 text-sm">This item is currently out of stock.</p>
      )}
    </div>
  )
}
