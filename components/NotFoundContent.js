"use client";

import Link from "next/link";
import { Button } from "@/app/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function NotFoundContent() {
  const { t, dir } = useLanguage();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      dir={dir}
    >
      <p className="text-6xl sm:text-8xl font-bold text-gray-200 select-none leading-none">
        404
      </p>

      <h1 className="mt-4 text-xl sm:text-2xl font-bold text-gray-800">
        {t.errors.notFoundTitle}
      </h1>

      <p className="mt-2 text-gray-500 max-w-sm">
        {t.errors.notFoundMessage}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md">
            {t.errors.backHome}
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="md">
            {t.errors.viewProducts}
          </Button>
        </Link>
      </div>
    </div>
  );
}
