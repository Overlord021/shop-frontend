import { cache } from 'react';
import { notFound } from 'next/navigation';

import ProductDetailView from '@/components/product/ProductDetailView';

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  'http://localhost:4000';

const getProduct = cache(
  async (id) => {
    try {
      const res = await fetch(
        `${BACKEND_API_URL}/api/product/${id}`,
        {
          next: {
            revalidate: 60,
            tags: [
              `product-${id}`,
            ],
          },
        }
      );

      if (!res.ok) {
        console.error(
          `Product fetch failed: ${res.status}`
        );

        return null;
      }

      return await res.json();
    } catch (err) {
      console.error(
        'getProduct error:',
        err
      );

      return null;
    }
  }
);

export async function generateMetadata({
  params,
}) {
  const { id } = await params;

  const product =
    await getProduct(id);

  return {
    title:
      product?.name ||
      'محصول یافت نشد',
  };
}

export default async function ProductPage({
  params,
}) {
  const { id } = await params;

  const product =
    await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
