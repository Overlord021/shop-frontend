"use client";

import { useEffect } from "react";
import { Button } from "@/app/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DashboardError({ error, reset }) {
  const { t, dir } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      dir={dir}
    >
      <div className="bg-white rounded-2xl border border-red-100 p-6 sm:p-10 max-w-md w-full space-y-4 shadow-sm">
        <p className="text-5xl sm:text-6xl font-bold text-red-100 select-none leading-none">
          500
        </p>

        <h1 className="text-lg sm:text-xl font-bold text-gray-800">{t.errors.dashboardTitle}</h1>

        <p className="text-sm text-gray-500">
          {error?.message ||
            t.errors.dashboardMessage}
        </p>

        <div className="flex gap-3 justify-center pt-2">
          <Button variant="danger" size="sm" onClick={reset}>
            {t.errors.tryAgain}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/dashboard")}
          >
            {t.errors.mainDashboard}
          </Button>
        </div>
      </div>
    </div>
  );
}
