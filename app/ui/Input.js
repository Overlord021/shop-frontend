"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const base   = "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";
const normal = "border-gray-300 bg-white hover:border-gray-400";
const errCls = "border-red-400 bg-red-50";

function Label({ label, required }) {
  const { dir } = useLanguage();
  if (!label) return null;
  return (
    <label className="text-sm font-medium text-gray-700" dir={dir}>
      {label}{required && <span className="text-red-500 me-0.5">*</span>}
    </label>
  );
}

export const Input = forwardRef(function Input({ label, error, className, required, dir, ...props }, ref) {
  const { dir: ctxDir } = useLanguage();
  return (
    <div className="flex flex-col gap-1.5">
      <Label label={label} required={required} />
      <input ref={ref} dir={dir ?? ctxDir} className={clsx(base, error ? errCls : normal, className)} {...props} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea({ label, error, className, required, dir, ...props }, ref) {
  const { dir: ctxDir } = useLanguage();
  return (
    <div className="flex flex-col gap-1.5">
      <Label label={label} required={required} />
      <textarea ref={ref} rows={4} dir={dir ?? ctxDir} className={clsx(base, "resize-none", error ? errCls : normal, className)} {...props} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

export const Select = forwardRef(function Select({ label, error, className, children, required, dir, ...props }, ref) {
  const { dir: ctxDir } = useLanguage();
  return (
    <div className="flex flex-col gap-1.5">
      <Label label={label} required={required} />
      <select ref={ref} dir={dir ?? ctxDir} className={clsx(base, error ? errCls : normal, className)} {...props}>{children}</select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});
