import { clsx } from "clsx";

export function Skeleton({ className }) {
  return <div className={clsx("animate-pulse bg-gray-200 rounded-md", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }) {
  return (
    <div>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="px-4 py-3"><Skeleton className="h-4 w-full" /></div>
      ))}
    </div>
  );
}
