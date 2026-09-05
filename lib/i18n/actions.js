"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale } from "./config";

export async function setLocaleAction(locale) {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, normalizeLocale(locale), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return normalizeLocale(locale);
}
