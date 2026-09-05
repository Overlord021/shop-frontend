"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";

const types = {
  success: { wrapper: "bg-green-50 border-green-200 text-green-800", icon: "✓", iconClass: "bg-green-100 text-green-600" },
  error:   { wrapper: "bg-red-50 border-red-200 text-red-800",       icon: "✕", iconClass: "bg-red-100 text-red-600" },
  warning: { wrapper: "bg-yellow-50 border-yellow-200 text-yellow-800", icon: "!", iconClass: "bg-yellow-100 text-yellow-600" },
  info:    { wrapper: "bg-blue-50 border-blue-200 text-blue-800",     icon: "i", iconClass: "bg-blue-100 text-blue-600" },
};

export function Alert({ type = "info", message, onClose, autoClose = false, duration = 4000 }) {
  const [visible, setVisible] = useState(true);
  const t = types[type] || types.info;

  useEffect(() => {
    if (!autoClose) return;
    const timer = setTimeout(() => { setVisible(false); onClose?.(); }, duration);
    return () => clearTimeout(timer);
  }, [autoClose, duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div className={clsx("flex items-start gap-3 p-4 rounded-lg border text-sm font-medium animate-fade-in", t.wrapper)}>
      <span className={clsx("w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5", t.iconClass)}>
        {t.icon}
      </span>
      <p className="flex-1">{message}</p>
      {onClose && (
        <button onClick={() => { setVisible(false); onClose(); }} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">✕</button>
      )}
    </div>
  );
}

export function useAlert() {
  const [alert, setAlert] = useState(null);
  const show  = (type, message) => setAlert({ type, message });
  const clear = () => setAlert(null);
  const AlertComponent = alert
    ? <Alert type={alert.type} message={alert.message} onClose={clear} autoClose />
    : null;
  return { show, clear, AlertComponent };
}
