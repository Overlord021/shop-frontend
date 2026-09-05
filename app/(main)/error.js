"use client";

import { useEffect } from "react";
import { Button } from "@/app/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function MainError({ error, reset }) {
  const { t, dir } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
      dir={dir}
    >
      <p className="text-6xl sm:text-8xl font-bold text-gray-200 select-none leading-none">
        500
      </p>

      <h1 className="mt-4 text-xl sm:text-2xl font-bold text-gray-800">
        {t.errors.mainTitle}
      </h1>

      <p className="mt-2 text-gray-500 max-w-sm">
        {error?.message || t.errors.mainMessage}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="primary" size="md" onClick={reset}>
          {t.errors.tryAgain}
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={() => (window.location.href = "/")}
        >
          {t.errors.backHome}
        </Button>
      </div>
    </div>
  );
}
