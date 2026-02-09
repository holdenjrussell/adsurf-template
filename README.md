# Adsurf Storefront Template

A starter template for building storefronts on the Adsurf platform.

## Getting Started

1. **Fork this repository** to create your brand's storefront

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your Platform API key from the Adsurf admin portal.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel**
   ```bash
   vercel
   ```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with CartDrawer
│   ├── page.tsx        # Homepage
│   ├── products/       # Product pages
│   └── collections/    # Collection pages
├── components/         # Your custom components
└── lib/               # Utilities
```

## Using the SDK

```typescript
import {
  createPlatformClient,
  useCart,
  AddToCartButton,
} from '@adsurf/storefront-sdk'

// Create client
const client = createPlatformClient({
  apiKey: process.env.PLATFORM_API_KEY!,
})

// Fetch products
const { products } = await client.getProducts()

// Use cart hook
const { addItem, itemCount } = useCart()
```

## Customization

- Update `tailwind.config.ts` with your brand colors
- Replace logo and images in `public/`
- Customize components to match your brand

## Documentation

See the [Adsurf Documentation](https://adsurf.ai/docs) for more details.
