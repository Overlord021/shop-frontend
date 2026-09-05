"use client";

import useSWR from "swr";
import { SWR_KEYS } from "@/lib/keys";
import { Skeleton } from "@/app/ui/Skeleton";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const colorMap = {
  red:    "text-red-600",
  blue:   "text-blue-600",
  green:  "text-green-600",
  orange: "text-orange-600",
  purple: "text-purple-600",
};

function StatCard({ label, value, loading, color = "red" }) {
  const { formatNumber } = useLanguage();
  return (
    <div className="rounded-xl sm:rounded-2xl border bg-white p-4 sm:p-6 flex flex-col gap-1.5 sm:gap-2">
      <span className="text-xs sm:text-sm text-gray-500">{label}</span>
      {loading ? (
        <Skeleton className="h-7 sm:h-8 w-14 sm:w-16" />
      ) : (
        <span className={`text-2xl sm:text-3xl font-bold ${colorMap[color]}`}>
          {formatNumber(value ?? 0)}
        </span>
      )}
    </div>
  );
}

export default function StatsClient() {
  const { data: productsRes, isLoading: lp } = useSWR(SWR_KEYS.products);
  const { data: brands,     isLoading: lb } = useSWR(SWR_KEYS.brands);
  const { data: categories, isLoading: lc } = useSWR(SWR_KEYS.categories);
  const { data: media,      isLoading: lm } = useSWR(SWR_KEYS.media);
  const { t } = useLanguage();

  const products = Array.isArray(productsRes?.data)
    ? productsRes.data
    : Array.isArray(productsRes)
      ? productsRes
      : [];

  const saleCount = products.filter((p) => p.sale > 0).length;
  const totalProductsCount = productsRes?.pagination?.total ?? products.length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
      <StatCard label={t.stats.products}   value={totalProductsCount} loading={lp} color="red"    />
      <StatCard label={t.stats.onSale}     value={saleCount}          loading={lp} color="orange" />
      <StatCard label={t.stats.brands}     value={brands?.length}     loading={lb} color="blue"   />
      <StatCard label={t.stats.categories} value={categories?.length} loading={lc} color="green"  />
      <StatCard label={t.stats.media}      value={media?.length}      loading={lm} color="purple" />
    </div>
  );
}
