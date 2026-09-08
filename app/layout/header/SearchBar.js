"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { t, dir } = useLanguage();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.header.searchPlaceholder}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 sm:py-3 ps-4 pe-12 sm:pe-14 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          dir={dir}
        />
        <button type="submit" className="cursor-pointer absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors">
          <Search />
        </button>
      </div>
    </form>
  );
}
