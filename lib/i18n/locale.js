import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, normalizeLocale } from "./config";
import { getDict } from "./dictionaries";

// ==================== Server Locale Helpers ====================
export async function getLocale() {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return normalizeLocale(value ?? DEFAULT_LOCALE);
}

export async function getServerTranslations() {
  const locale = await getLocale();
  return { locale, t: getDict(locale), dir: locale === "en" ? "ltr" : "rtl" };
}
