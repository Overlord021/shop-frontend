"use client";

import { clsx } from "clsx";

const variants = {
  primary:   "bg-red-600 hover:bg-red-700 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
  outline:   "border border-gray-300 hover:bg-gray-50 text-gray-800 bg-white",
  ghost:     "hover:bg-gray-100 text-gray-700",
  danger:    "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
  navy:      "bg-[#1a3c6e] hover:bg-[#0f2548] text-white",
};

const sizes = {
  sm:   "px-3 py-1.5 text-sm",
  md:   "px-4 py-2 text-sm",
  lg:   "px-6 py-3 text-base",
  icon: "p-2",
};

export function Button({ children, variant = "primary", size = "md", className, loading = false, disabled, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}
