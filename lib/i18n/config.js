// ============================================
// i18n Config
// ============================================

export const LOCALES = ["fa", "en"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_COOKIE = "locale";

export function normalizeLocale(value) {
  return value === "fa" ? "fa" : DEFAULT_LOCALE;
}


