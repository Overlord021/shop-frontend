"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Languages } from "lucide-react";

export function LanguageToggle({ className = "" }) {
  const { t, toggleLocale, isPending } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={t.languageToggle.ariaLabel}
      title={t.languageToggle.ariaLabel}
      className={`cursor-pointer flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-gray-50 text-[11px] sm:text-xs font-bold transition disabled:opacity-50 ${className}`}
    >
      <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.8} />
      {t.languageToggle.switchToLabel}
    </button>
  );
}
