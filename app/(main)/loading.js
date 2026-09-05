import { ProductCardSkeleton } from "@/app/ui/Skeleton";

export default function MainLoading() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero skeleton */}
      <div className="w-full h-12 bg-gray-100 animate-pulse mb-8" />

      {/* Section title */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6">
        <div className="h-6 sm:h-7 w-32 sm:w-40 bg-gray-200 animate-pulse rounded mb-5 sm:mb-6" />

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        {/* Category title */}
        <div className="h-6 sm:h-7 w-40 sm:w-48 bg-gray-200 animate-pulse rounded mt-10 sm:mt-12 mb-5 sm:mb-6" />

        {/* Category pills */}
        <div className="flex gap-2.5 sm:gap-3 flex-wrap mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 sm:h-9 w-20 sm:w-24 bg-gray-200 animate-pulse rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
