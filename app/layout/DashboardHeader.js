"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { SWR_KEYS } from "@/lib/keys";
import { authApi } from "@/lib/api";
import { useDashboardSidebar } from "@/lib/sidebar-context";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SquareArrowRightExit, Menu } from "lucide-react";

export function DashboardHeader() {
  const { data: session, mutate } = useSWR(SWR_KEYS.session);
  const { setOpen } = useDashboardSidebar();
  const router = useRouter();
  const { t, dir } = useLanguage();

  const handleSignOut = async () => {
    try { await authApi.signOut(); } catch {}
    mutate(null, false);
    router.push("/sign-in");
  };

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 shrink-0" dir={dir}>
      <div className="flex items-center gap-2 sm:gap-3">
        <h1 className="text-xs sm:text-sm font-semibold text-gray-500">{t.dashboardHeader.panelName}</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition"
          aria-label={t.dashboardHeader.openMenu}
        >
          <Menu className="w-5 h-5" />
        </button>
        {session && (
          <span className="hidden xs:inline text-xs sm:text-sm text-gray-600">{session.email || t.dashboardHeader.adminFallback}</span>
        )}
        <button
          onClick={handleSignOut}
          className="group cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-red-600 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          <SquareArrowRightExit className="w-5 h-5 sm:w-6 sm:h-6 stroke-gray-500 stroke-[1.7] group-hover:stroke-red-600"/>
          {t.dashboardHeader.signOut}
        </button>
      </div>
    </header>
  );
}
