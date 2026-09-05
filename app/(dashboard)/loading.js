import { TableRowSkeleton } from "@/app/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-3 sm:p-6 space-y-6" dir="rtl">
      {/* Page title skeleton */}
      <div className="h-7 sm:h-8 w-40 sm:w-48 bg-gray-200 animate-pulse rounded" />

      {/* Stat cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 space-y-3"
          >
            <div className="h-4 w-16 sm:w-20 bg-gray-200 animate-pulse rounded" />
            <div className="h-7 sm:h-8 w-10 sm:w-12 bg-gray-100 animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Table header */}
        <div className="flex gap-4 px-6 py-4 border-b border-gray-100">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 animate-pulse rounded"
              style={{ width: `${[30, 20, 25, 15][i]}%` }}
            />
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <TableRowSkeleton key={i} cols={4} />
        ))}
      </div>
    </div>
  );
}
