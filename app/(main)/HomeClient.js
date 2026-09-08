"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { localizedName, productName } from "@/lib/i18n/displayName";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// ---------- ProductCard ----------
function ProductCard({ product, priority = false }) {
  const { t, formatPrice, locale } = useLanguage();
  const image = product.media?.[0]?.url;
  const name = productName(product);

  const basePrice = locale === 'en' ? (product.dollar_price || 0) : (product.price || 0);
  const finalPrice =
    product.sale > 0
      ? (locale === 'en'
          ? Number((basePrice * (1 - product.sale / 100)).toFixed(2))
          : Math.round(basePrice * (1 - product.sale / 100)))
      : null;

  return (
    <Link
      href={`/products/${product._id}`}
      className="cursor-pointer group flex flex-col h-full rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition bg-white"
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
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-contain group-hover:scale-105 transition duration-300"
              sizes="(max-width:480px) 45vw, (max-width:768px) 224px, 224px"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            {t.common.noImage}
          </div>
        )}
      </div>

      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 h-8 sm:h-10">
          {name}
        </p>

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

// ---------- CategoryPill ----------
function CategoryPill({ category }) {
  const { t, locale } = useLanguage();
  const name = localizedName(category, locale);
  return (
    <Link
      href={`/products?category=${category.en_name}`}
      className="cursor-pointer flex flex-col items-center gap-3"
    >
      <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full bg-white border-2 border-gray-100 overflow-hidden hover:border-red-400 hover:shadow-md transition relative">
        {category.image ? (
          <Image
            src={category.image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width:480px) 80px, 112px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            {t.common.questionMark}
          </div>
        )}
      </div>

      <span className="text-xs sm:text-sm text-gray-700 font-medium text-center">
        {name}
      </span>
    </Link>
  );
}

// ---------- SectionHeader ----------
function SectionHeader({ title, href }) {
  const { t, dir } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-5" dir={dir}>
      <h2 className="text-base sm:text-lg font-bold text-gray-900">
        {title}
      </h2>

      {href && (
        <Link
          href={href}
          className="cursor-pointer flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:text-red-600 transition"
          dir={dir}
        >
          {t.home.viewAll}
          {dir === "rtl" ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Link>
      )}
    </div>
  );
}

// ---------- ProductSlider ----------
function ProductSlider({ products, id }) {
  const { dir } = useLanguage();
  const prevId = `prev-${id}`;
  const nextId = `next-${id}`;

  return (
    <div className="relative group/slider">
      <button
        id={prevId}
        className="cursor-pointer absolute start-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition hover:bg-gray-50"
      >
        {dir === "rtl" ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <Swiper
        modules={[Navigation, FreeMode]}
        navigation={{
          prevEl: `#${prevId}`,
          nextEl: `#${nextId}`,
        }}
        freeMode={{
          enabled: true,
          sticky: false,
        }}
        slidesPerView="auto"
        spaceBetween={16}
        grabCursor
        dir={dir}
        className="overflow-visible! px-1"
      >
        {products.map((p, index) => (
          <SwiperSlide
            key={p._id}
            style={{ width: "auto" }}
          >
            <div className="w-36 xs:w-40 sm:w-56 p-1 h-full">
              <ProductCard
                product={p}
                priority={index < 3}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        id={nextId}
        className="cursor-pointer absolute end-0 top-1/2 -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition hover:bg-gray-50"
      >
        {dir === "rtl" ? (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
}

// ---------- CategorySlider ----------
function CategorySlider({ categories }) {
  const { dir } = useLanguage();
  return (
    <Swiper
      modules={[FreeMode]}
      freeMode={{ enabled: true }}
      slidesPerView="auto"
      spaceBetween={20}
      grabCursor
      dir={dir}
    >
      {categories.map((c) => (
        <SwiperSlide
          key={c._id}
          style={{ width: "auto" }}
        >
          <CategoryPill category={c} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// ---------- BrandsBar ----------
function BrandsBar({ brands }) {
  const { t, dir, locale } = useLanguage();
  if (!brands.length) return null;

  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden" dir={dir}>
      <div className="flex flex-col sm:flex-row items-stretch">
        <div
          className="shrink-0 text-white px-4 sm:px-6 py-3 sm:py-5 flex sm:flex-col items-center justify-center gap-2 sm:min-w-29 sm:w-53.5"
          style={{
            background:
              "linear-gradient(90deg, #0079b1, #1b3570)",
          }}
        >
          <BadgeCheck
            className="w-6 h-6 sm:w-9 sm:h-9"
            strokeWidth={1.8}
          />

          <span className="text-sm sm:text-lg font-bold text-center leading-tight">
            {t.home.featuredBrands}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <Swiper
            modules={[FreeMode]}
            freeMode={{ enabled: true }}
            slidesPerView="auto"
            spaceBetween={0}
            grabCursor
            dir={dir}
            className="h-full"
          >
            {brands.map((brand, i) => (
              <SwiperSlide
                key={brand._id}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              >
                <div className="flex items-center h-full">
                  {i > 0 && (
                    <div className="w-px h-12 bg-gray-200 shrink-0" />
                  )}

                  <Link
                    href={`/products?brand=${brand._id}`}
                    className="cursor-pointer px-5 sm:px-8 py-3 sm:py-5 flex items-center justify-center hover:bg-gray-50 transition h-full"
                  >
                    {brand.logo ? (
                      <div className="relative w-20 h-8 sm:w-24 sm:h-10">
                        <Image
                          src={brand.logo}
                          alt={localizedName(brand, locale)}
                          fill
                          className="object-contain grayscale hover:grayscale-0 transition"
                          sizes="96px"
                        />
                      </div>
                    ) : (
                      <span className="text-xs sm:text-sm font-bold text-gray-600">
                        {localizedName(brand, locale)}
                      </span>
                    )}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

// ---------- Main Page ----------
export default function HomeClient({
  products = [],
  categories = [],
  brands = [],
  saleProducts = [],
}) {
  const { t, dir } = useLanguage();
  return (
    <div className="py-6 sm:py-10 space-y-8 sm:space-y-12" dir={dir}>
      <BrandsBar brands={brands} />

      {!!categories.length && (
        <section>
          <SectionHeader
            title={t.home.categories}
            href="/products"
          />
          <CategorySlider categories={categories} />
        </section>
      )}

      {!!products.length && (
        <section>
          <SectionHeader
            title={t.home.allProducts}
            href="/products"
          />

          <div className="border border-gray-200 rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-4 overflow-hidden">
            <ProductSlider
              products={products}
              id="all"
            />
          </div>
        </section>
      )}

      {!!saleProducts.length && (
        <section>
          <SectionHeader
            title={t.home.onSale}
            href="/products?sale=1"
          />

          <div className="border border-gray-200 rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-4 overflow-hidden">
            <ProductSlider
              products={saleProducts}
              id="sale"
            />
          </div>
        </section>
      )}
    </div>
  );
}
