import { clsx } from "clsx";

const variants = {
  default: "bg-gray-100 text-gray-700",
  red:     "bg-red-100 text-red-700",
  green:   "bg-green-100 text-green-700",
  blue:    "bg-blue-100 text-blue-700",
  orange:  "bg-orange-100 text-orange-700",
};

export function Badge({ children, variant = "default", className }) {
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
