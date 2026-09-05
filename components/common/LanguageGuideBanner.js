"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Languages } from "lucide-react";

export default function LanguageGuideBanner() {
  const [show, setShow] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    try {
      const seen = localStorage.getItem("languageGuideSeen");
      const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
      if (!seen && !match) {
        setShow(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("languageGuideSeen");
      if (seen || locale !== "en") setShow(false);
    } catch {
      if (locale !== "en") setShow(false);
    }
  }, [locale]);

  const handleDismiss = () => {
    setShow(false);
    try {
      localStorage.setItem("languageGuideSeen", "true");
    } catch {}
  };

  if (!show) return null;

  return (
    <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 text-xs sm:text-sm text-blue-900 flex items-center justify-between gap-3 shadow-xs" dir="ltr">
      <div className="flex items-center gap-2">
        <Languages className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          <strong>Language:</strong> The website is currently in English. You can change the language using the language switcher in the top right.
        </span>
      </div>
      <button
        onClick={handleDismiss}
        className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium px-2.5 py-1 rounded-md transition text-xs shrink-0 flex items-center gap-1"
      >
        Got it
      </button>
    </div>
  );
}
