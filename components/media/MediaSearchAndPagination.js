"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/app/ui/Button";

export default function MediaSearchAndPagination({ initialQuery, pagination }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, formatNumber, locale, dir } = useLanguage();
  const [search, setSearch] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    const p = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      p.set("q", search.trim());
    } else {
      p.delete("q");
    }
    p.delete("page"); // reset to page 1
    router.push(`/dashboard/media?${p.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    router.push("/dashboard/media");
  };

  const handlePageChange = (newPage) => {
    const p = new URLSearchParams(searchParams.toString());
    if (newPage > 1) {
      p.set("page", String(newPage));
    } else {
      p.delete("page");
    }
    router.push(`/dashboard/media?${p.toString()}`);
  };

  const { page = 1, limit = 30, total = 0, totalPages = 1 } = pagination;
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="space-y-4" dir={dir}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-2 sm:gap-3 items-center">
        <input
          type="text"
          placeholder={t.media.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="cursor-text px-3 sm:px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 w-full xs:w-auto xs:flex-1 sm:flex-none sm:w-72"
        />
        <Button type="submit" variant="primary" size="sm">
          {t.media.searchBtn || "Search"}
        </Button>
        {initialQuery && (
          <Button type="button" variant="outline" size="sm" onClick={handleClear}>
            {t.media.clear || "Clear"}
          </Button>
        )}
      </form>

      {/* Showing Info */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
        <span>
          {locale === "en"
            ? `Showing ${formatNumber(start)}–${formatNumber(end)} of ${formatNumber(total)} ${t.media.images}`
            : `${t.media.showing} ${formatNumber(start)} ${t.media.to} ${formatNumber(end)} ${t.media.of} ${formatNumber(total)} ${t.media.images}`}
        </span>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
              className="cursor-pointer px-3 py-1 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              ‹ {t.media.prev}
            </button>

            <span className="px-2 text-xs text-gray-600">
              {formatNumber(page)} / {formatNumber(totalPages)}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="cursor-pointer px-3 py-1 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              {t.media.next} ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
