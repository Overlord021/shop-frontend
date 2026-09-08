"use client";

import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { SWR_KEYS } from "@/lib/keys";
import { authApi } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./header/CartDrawer";
import { MobileDrawer } from "./header/MobileDrawer";
import { SearchBar } from "./header/SearchBar";
import { LanguageToggle } from "./LanguageToggle";
import LanguageGuideBanner from "@/components/common/LanguageGuideBanner";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { localizedName } from "@/lib/i18n/displayName";
import { LayoutGrid, Menu, ShoppingCart } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { data: session, mutate } = useSWR(SWR_KEYS.session);
  const { data: categoriesData } = useSWR(SWR_KEYS.categories);
  const { totalCount } = useCart();
  const { t, formatNumber, dir, locale } = useLanguage();
  const isLoggedIn = !!session;
  const categories = categoriesData || [];

  const handleSignOut = async () => {
    try { await authApi.signOut(); } catch {}
    mutate(null, false);
  };

  return (
    <>
      <LanguageGuideBanner />
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm" dir={dir}>
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4 h-14 sm:h-16" dir={dir}>

            <Link href="/" className="cursor-pointer shrink-0 flex items-center gap-1.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs sm:text-sm leading-none">{t.header.logoLetter}</span>
              </div>
              <div className="hidden xs:flex flex-col leading-tight">
                <span className="font-black text-gray-900 text-sm sm:text-base leading-none">{t.header.brandName}</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 leading-none mt-0.5">{t.header.brandTag}</span>
              </div>
            </Link>

            <div className="flex-1 hidden md:flex">
              <SearchBar />
            </div>

            <div className="flex items-center gap-1 sm:gap-2 ms-auto md:me-0">
              <button
                onClick={() => setCartOpen(true)}
                className="cursor-pointer relative p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-full transition"
              >
                <ShoppingCart size={20} strokeWidth={1.5}/>
                {totalCount > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {totalCount > 99 ? '99+' : formatNumber(totalCount)}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="cursor-pointer hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition">
                    <LayoutGrid />{t.header.backToDashboard}
                  </Link>
                  <button onClick={handleSignOut} className="cursor-pointer hidden md:block text-sm font-medium text-gray-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition">{t.header.signOut}</button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="cursor-pointer hidden md:block text-sm font-medium text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg transition">{t.header.signIn}</Link>
                  <Link href="/sign-up" className="cursor-pointer hidden md:flex items-center px-4 sm:px-5 py-2 text-sm font-semibold border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition">{t.header.signUp}</Link>
                </>
              )}

              <LanguageToggle />

              <button onClick={() => setMobileOpen(true)} className="cursor-pointer lg:hidden p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="md:hidden pb-2.5 sm:pb-3">
            <SearchBar />
          </div>
        </div>

        <div className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 h-11" dir={dir}>
              <Link href="/products" className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-gray-50 transition whitespace-nowrap">
                <Menu />{t.header.productCategories}
              </Link>
              <div className="w-px h-5 bg-gray-200 mx-1" />
              <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
                {categories.slice(0, 8).map((cat) => (
                  <Link key={cat._id} href={`/products?category=${cat.en_name}`} className="cursor-pointer px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition whitespace-nowrap">
                    {localizedName(cat, locale)}
                  </Link>
                ))}
              </div>
              {isLoggedIn && (
                <>
                  <div className="w-px h-5 bg-gray-200 mx-1 me-auto" />
                  <Link href="/dashboard" className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition whitespace-nowrap">
                   <LayoutGrid />{t.header.backToDashboard}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} categories={categories} />
    </>
  );
}