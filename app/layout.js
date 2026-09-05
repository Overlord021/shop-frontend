import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { getLocale } from "@/lib/i18n/locale";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: { default: "فروشگاه", template: "%s | فروشگاه" },
  description: "بهترین محصولات با بهترین قیمت",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛍️</text></svg>",
  },
};

const SET_LOCALE_SCRIPT = `
(function () {
  try {
    var m = document.cookie.match(/(?:^|; )locale=([^;]*)/);
    var locale = m && decodeURIComponent(m[1]) === "fa" ? "fa" : "en";
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="set-locale-dir" strategy="beforeInteractive">
          {SET_LOCALE_SCRIPT}
        </Script>
        <LanguageProvider initialLocale={locale}>
          <CartProvider>
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
