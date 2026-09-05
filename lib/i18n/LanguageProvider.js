"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getDict } from "./dictionaries";
import { LOCALE_COOKIE, normalizeLocale } from "./config";
import { setLocaleAction } from "./actions";
import { formatPrice as formatPriceFn } from "./displayName";

const LanguageContext = createContext(null);

function readCookieLocale() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// ==================== Language Provider ====================
export function LanguageProvider({ children, initialLocale = "en" }) {
  const [locale, setLocaleState] = useState(() => {
    return normalizeLocale(initialLocale);
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const saved = normalizeLocale(readCookieLocale() || initialLocale);
    setLocaleState((prev) => (saved !== prev ? saved : prev));
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
  }, [locale]);

  const changeLocale = useCallback((next) => {
    const normalized = normalizeLocale(next);
    setLocaleState(normalized);
    startTransition(async () => {
      await setLocaleAction(normalized);
      router.refresh();
    });
  }, [router]);

  const toggleLocale = useCallback(() => {
    changeLocale(locale === "en" ? "fa" : "en");
  }, [locale, changeLocale]);

  const formatNumber = useCallback((value) => {
    const num = Number(value ?? 0);
    return num.toLocaleString(locale === "en" ? "en-US" : "fa-IR");
  }, [locale]);

  const formatPrice = useCallback((amountInToman) => {
    return formatPriceFn(amountInToman, locale);
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    dir: locale === "en" ? "ltr" : "rtl",
    t: getDict(locale),
    changeLocale,
    toggleLocale,
    formatNumber,
    formatPrice,
    isPending,
  }), [locale, changeLocale, toggleLocale, formatNumber, formatPrice, isPending]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
