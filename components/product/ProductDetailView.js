"use client";

import ProductGallery from "./ProductGallery";
import AddToCartBtn from "./AddToCartBtn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { localizedName, productName } from "@/lib/i18n/displayName";

export default function ProductDetailView({ product }) {
  const { t, formatPrice, locale, dir } = useLanguage();

  const price = locale === 'en' ? (product.dollar_price || 0) : (product.price || 0);
  const sale = Number(product.sale) || 0;
  const finalPrice = sale > 0
    ? (locale === 'en'
        ? Number((price * (1 - sale / 100)).toFixed(2))
        : Math.round(price * (1 - sale / 100)))
    : price;
  const name = productName(product);
  const categoryName = localizedName(product.category, locale);
  const brandName = localizedName(product.brand, locale);

  return (
    <div className="py-6 sm:py-10" dir={dir}>
      <nav className="text-xs text-gray-400 mb-4 sm:mb-6 flex gap-1 flex-wrap" dir={dir}>
        <span>{t.productDetail.home}</span>

        {product.category && (
          <>
            <span>/</span>
            <span>{categoryName}</span>
          </>
        )}

        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10" dir={dir}>
        <ProductGallery media={product.media ?? []} />

        <div className="space-y-4 sm:space-y-6">
          {brandName && (
            <p className="text-sm text-gray-400">{brandName}</p>
          )}

          <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-7 sm:leading-8">
            {name}
          </h1>

          <div className="border-t border-gray-100" />

          <div className="space-y-1">
            {sale > 0 ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    {sale}{t.common.percentSign}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(price, locale)}
                  </span>
                </div>

                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formatPrice(finalPrice, locale)}
                </p>
              </>
            ) : (
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {formatPrice(price, locale)}
              </p>
            )}
          </div>

          <AddToCartBtn product={product} />

          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {categoryName && (
              <span className="px-3 py-1 rounded-full bg-gray-100">
                {t.productDetail.category} {categoryName}
              </span>
            )}

            {brandName && (
              <span className="px-3 py-1 rounded-full bg-gray-100">
                {t.productDetail.brand} {brandName}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
