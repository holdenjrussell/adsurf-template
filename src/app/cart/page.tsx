'use client'

import { useCart } from '@adsurf/storefront-sdk'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <a
              href="/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex gap-4 pb-6 border-b border-gray-200"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image.url}
                    alt={item.image.altText || item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                {item.variantTitle && item.variantTitle !== 'Default Title' && (
                  <p className="text-sm text-gray-500">{item.variantTitle}</p>
                )}
                <p className="text-gray-900 mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="ml-4 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between text-lg font-medium mb-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Shipping and taxes calculated at checkout.
          </p>
          <a
            href="/checkout"
            className="block w-full bg-black text-white text-center py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Proceed to Checkout
          </a>
          <a
            href="/products"
            className="block w-full text-center py-4 text-gray-600 hover:text-black"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </main>
  )
}
