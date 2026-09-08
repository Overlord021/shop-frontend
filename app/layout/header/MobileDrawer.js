"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { localizedName } from "@/lib/i18n/displayName";

export function MobileDrawer({ open, onClose, isLoggedIn, onSignOut, categories }) {
  const ref = useRef(null);
  const { t, dir, locale } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("mousedown", handler); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        className="absolute end-0 top-0 h-full w-[85vw] xs:w-72 sm:w-80 bg-white shadow-2xl flex flex-col"
        dir={dir}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <span className="font-bold text-lg text-gray-900">{t.mobileDrawer.menu}</span>
          <button onClick={onClose} className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full transition text-gray-500"><X/></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/" onClick={onClose} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition">{t.mobileDrawer.home}</Link>
          <Link href="/products" onClick={onClose} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition">{t.mobileDrawer.allProducts}</Link>
          {categories?.map((cat) => (
            <Link key={cat._id} href={`/products?category=${cat.en_name}`} onClick={onClose} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-600 text-sm transition">{localizedName(cat, locale)}</Link>
          ))}
          {isLoggedIn && (
            <Link href="/dashboard" onClick={onClose} className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition">{t.header.backToDashboard}</Link>
          )}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          {isLoggedIn ? (
            <button onClick={() => { onSignOut(); onClose(); }} className="cursor-pointer w-full px-4 py-2.5 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium">{t.mobileDrawer.signOut}</button>
          ) : (
            <>
              <Link href="/sign-in" onClick={onClose} className="cursor-pointer block w-full text-center px-4 py-2.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium">{t.mobileDrawer.signIn}</Link>
              <Link href="/sign-up" onClick={onClose} className="cursor-pointer block w-full text-center px-4 py-2.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium">{t.mobileDrawer.signUp}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
