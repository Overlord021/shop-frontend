'use client';

import { useMemo, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { localizedName, productName } from '@/lib/i18n/displayName';

// ---------- ProductCard ----------
function ProductCard({ product }) {
  const { t, formatPrice, locale } = useLanguage();
  const image = product.media?.[0]?.url;
  const name = productName(product);
  const basePrice = locale === 'en' ? (product.dollar_price || 0) : (product.price || 0);
  const finalPrice = product.sale > 0
    ? (locale === 'en'
        ? Number((basePrice * (1 - product.sale / 100)).toFixed(2))
        : Math.round(basePrice * (1 - product.sale / 100)))
    : null;

  return (
    <Link
      href={`/products/${product._id}`}
      className="cursor-pointer group flex flex-col h-full rounded-xl sm:rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-md transition"
    >
      <div className="aspect-square bg-gray-50 relative p-2 sm:p-3 shrink-0">
        {product.sale > 0 && (
          <span className="absolute top-1.5 end-1.5 sm:top-2 sm:end-2 z-10 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-lg">
            {product.sale}{t.common.percentSign}
          </span>
        )}
        {image ? (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={name}
              fill
              priority
              className="object-contain group-hover:scale-105 transition duration-300"
              sizes="(max-width:480px) 50vw, (max-width:768px) 33vw, (max-width:1280px) 25vw, 20vw"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            {t.common.noImage}
          </div>
        )}
      </div>
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 h-8 sm:h-10">{name}</p>
        <div className="mt-auto flex flex-col justify-end min-h-10 sm:min-h-[46px]">
          {finalPrice ? (
            <>
              <p className="text-[11px] sm:text-xs text-gray-400 line-through">
                {formatPrice(basePrice, locale)}
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                {formatPrice(finalPrice, locale)}
              </p>
            </>
          ) : (
            <>
              <p className="text-[11px] sm:text-xs text-transparent select-none" aria-hidden="true">
                &nbsp;
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                {formatPrice(basePrice, locale)}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// ---------- ProductsFilter ----------
export default function ProductsFilter({ products = [], pagination = { page: 1, totalPages: 1, total: 0 }, categories = [], brands = [] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, formatNumber, locale, dir } = useLanguage();
  const productCountWord = (count) => count === 1 ? t.products.countSingular : t.products.countPlural;

  const qParam      = searchParams.get('q')        || '';
  const catParam    = searchParams.get('category') || '';
  const saleParam   = searchParams.get('sale') === '1';
  const brandParam  = searchParams.get('brand')    || '';

  const [search, setSearch] = useState(qParam);

  const pushParams = useCallback((overrides) => {
    const next = {
      q:        qParam,
      category: catParam,
      sale:     saleParam ? '1' : '',
      brand:    brandParam,
      page:     1,
      ...overrides,
    };
    const p = new URLSearchParams();
    if (next.q)        p.set('q',        next.q);
    if (next.category) p.set('category', next.category);
    if (next.sale)     p.set('sale',     next.sale);
    if (next.brand)    p.set('brand',    next.brand);
    if (next.page > 1) p.set('page',     String(next.page));

    router.push(`/products?${p.toString()}`);
  }, [qParam, catParam, saleParam, brandParam, router]);

  const filtered = useMemo(() => {
    let list = products;
    if (catParam)      list = list.filter((p) => p.category?.en_name === catParam);
    if (saleParam)     list = list.filter((p) => p.sale > 0);
    if (brandParam)    list = list.filter((p) => p.brand?._id === brandParam);
    if (qParam.trim()) list = list.filter((p) =>
      p.name.toLowerCase().includes(qParam.trim().toLowerCase())
    );
    return list;
  }, [products, catParam, saleParam, brandParam, qParam]);

  const activeBrandName = brandParam
    ? localizedName(brands.find((b) => b._id === brandParam || b.en_name === brandParam), locale) || brandParam
    : '';

  const hasFilter = qParam || catParam || saleParam || brandParam;
  const totalCountVal = pagination.total || products.length;

  return (
    <div className="space-y-6" dir={dir}>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.products.pageTitle}</h1>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center" dir={dir}>
        <input
          type="text"
          placeholder={t.products.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') pushParams({ q: search.trim() }); }}
          className="cursor-text px-3 sm:px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 w-full xs:w-auto xs:flex-1 sm:flex-none sm:w-52"
        />

        <select
          value={catParam}
          onChange={(e) => pushParams({ category: e.target.value })}
          className="cursor-pointer px-3 sm:px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-gray-400"
        >
          <option value="">{t.products.allCategories}</option>
          {categories.map((c) => (
            <option key={c._id} value={c.en_name}>{localizedName(c, locale)}</option>
          ))}
        </select>

        <button
          onClick={() => pushParams({ sale: saleParam ? '' : '1' })}
          className={`cursor-pointer px-3 sm:px-4 py-2 rounded-xl border text-xs sm:text-sm transition ${
            saleParam
              ? 'bg-red-50 border-red-300 text-red-600'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
          }`}
        >
          {t.products.onSaleOnly}
        </button>

        <button
          onClick={() => pushParams({ q: search.trim() })}
          className="cursor-pointer px-3 sm:px-4 py-2 rounded-xl bg-gray-900 text-white text-xs sm:text-sm hover:bg-gray-700 transition"
        >
          {t.products.search}
        </button>

        {activeBrandName && (
          <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-700 font-medium">
            {t.products.brandPrefix} {activeBrandName}
            <button
              onClick={() => pushParams({ brand: '' })}
              className="cursor-pointer text-blue-400 hover:text-blue-700 transition"
            >
              ✕
            </button>
          </span>
        )}

        {hasFilter && (
          <button
            onClick={() => { setSearch(''); router.push('/products'); }}
            className="cursor-pointer px-3 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition"
          >
            {t.products.clear}
          </button>
        )}

        <span className="text-xs sm:text-sm text-gray-400 me-auto" dir={dir}>
          {locale === 'en'
            ? `${formatNumber(totalCountVal)} ${productCountWord(totalCountVal)}`
            : `${formatNumber(totalCountVal)} ${t.products.countSuffix}`}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
        {products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-400 py-14 sm:py-20">{t.products.noResults}</p>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {Array.from({ length: pagination.totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === pagination.page;
            return (
              <button
                key={pageNum}
                onClick={() => {
                  const p = new URLSearchParams(searchParams.toString());
                  if (pageNum > 1) p.set('page', String(pageNum));
                  else p.delete('page');
                  router.push(`/products?${p.toString()}`);
                }}
                className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {formatNumber(pageNum)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
