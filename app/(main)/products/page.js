import { Suspense } from 'react';
import ProductsFilter from '@/components/product/ProductsFilter';
import { getLocale } from '@/lib/i18n/locale';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:4000';

export const metadata = { title: 'فروشگاه' };

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const locale = await getLocale();
  const currency = locale === 'en' ? 'usd' : 'toman';

  const q = params.q || '';
  const category = params.category || '';
  const brand = params.brand || '';
  const sale = params.sale === '1' ? '1' : '';
  const page = params.page || '1';
  const limit = '20';

  const queryObj = new URLSearchParams({
    ...(q ? { q } : {}),
    lang: locale,
    currency,
    ...(category ? { category } : {}),
    ...(brand ? { brand } : {}),
    ...(sale ? { sale } : {}),
    page,
    limit,
  });

  let productsData = { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 1 } };
  let categories = [];
  let brands = [];

  try {
    const [prodRes, catRes, brandRes] = await Promise.all([
      fetch(`${BACKEND_API_URL}/api/product?${queryObj.toString()}`, { next: { revalidate: 0 } }),
      fetch(`${BACKEND_API_URL}/api/category/`, { next: { revalidate: 60 } }),
      fetch(`${BACKEND_API_URL}/api/brand/`, { next: { revalidate: 60 } }),
    ]);

    if (prodRes.ok) {
      const json = await prodRes.json();
      if (json && Array.isArray(json.data)) {
        productsData = json;
      } else if (Array.isArray(json)) {
        productsData = { data: json, pagination: { page: 1, limit: json.length, total: json.length, totalPages: 1 } };
      }
    }
    if (catRes.ok) categories = await catRes.json();
    if (brandRes.ok) brands = await brandRes.json();
  } catch (err) {
    console.error("ProductsPage fetch error:", err);
  }

  return (
    <div className="py-6 sm:py-10 space-y-6 sm:space-y-8">
      <Suspense fallback={null}>
        <ProductsFilter
          products={productsData.data}
          pagination={productsData.pagination}
          categories={Array.isArray(categories) ? categories : []}
          brands={Array.isArray(brands) ? brands : []}
        />
      </Suspense>
    </div>
  );
}

