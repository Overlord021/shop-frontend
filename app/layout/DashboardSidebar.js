"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Box, House, Image, MoveLeft, MoveRight, Tag, TextAlignJustify, X } from "lucide-react";
import { useDashboardSidebar } from "@/lib/sidebar-context";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function getNavItems(t) {
  return [
    {
      label: t.dashboardSidebar.products,
      href: "/dashboard/products",
      icon: <Box size={20} strokeWidth={1.8} />
    },
    {
      label: t.dashboardSidebar.categories,
      href: "/dashboard/category",
      icon: <TextAlignJustify size={20} strokeWidth={1.8} />
    },
    {
      label: t.dashboardSidebar.brands,
      href: "/dashboard/brand",
      icon: <Tag size={20} strokeWidth={1.8} />
    },
    {
      label: t.dashboardSidebar.media,
      href: "/dashboard/media",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];
}

function SidebarContent({ pathname, onNavigate }) {
  const { t, dir } = useLanguage();
  const navItems = getNavItems(t);
  return (
    <>
      {/* Logo */}
      <div className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-5 border-b border-gray-100">
        <Link href="/" className="cursor-pointer flex items-center gap-2" onClick={onNavigate}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs sm:text-sm">{t.dashboardSidebar.logoLetter}</span>
          </div>
          <span className="font-bold text-gray-800 text-sm sm:text-base">{t.dashboardSidebar.panelTitle}</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className={clsx("cursor-pointer",
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            pathname === "/dashboard"
              ? "bg-red-50 text-red-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <House size={20} strokeWidth={1.8} />
          {t.dashboardSidebar.dashboardHome}
        </Link>

        <div className="pt-3 pb-1 px-3">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{t.dashboardSidebar.management}</p>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={clsx("cursor-pointer",
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-red-50 text-red-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <Link
          href="/"
          onClick={onNavigate}
          className="group cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {dir === "rtl" ? (
            <MoveLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:stroke-gray-700 stroke-[1.7]" />
          ) : (
            <MoveRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:stroke-gray-700 stroke-[1.7]" />
          )}
          {t.dashboardSidebar.backToSite}
        </Link>
      </div>
    </>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useDashboardSidebar();
  const { t, dir } = useLanguage();

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-white border-s border-gray-200 min-h-screen flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile / tablet drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside
            className="absolute start-0 top-0 h-full w-64 xs:w-72 bg-white shadow-2xl flex flex-col"
            dir={dir}
          >
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute end-3 top-3 sm:top-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition"
              aria-label={t.dashboardSidebar.closeMenu}
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
