"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { localizedName, productName } from "@/lib/i18n/displayName";

export function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, totalCount } = useCart();
  const { t, formatNumber, formatPrice, locale, dir } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("mousedown", handler); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  const totalPrice = items.reduce((s, i) => {
    const basePrice = locale === 'en' ? (i.dollar_price || 0) : (i.price || 0);
    const fp = i.sale > 0
      ? (locale === 'en'
          ? Number((basePrice * (1 - i.sale / 100)).toFixed(2))
          : Math.round(basePrice * (1 - i.sale / 100)))
      : basePrice;
    return s + fp * i.qty;
  }, 0);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        className="absolute end-0 top-0 h-full w-full xs:w-80 sm:w-96 bg-white shadow-2xl flex flex-col"
        dir={dir}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <span className="font-bold text-gray-900">{t.cart.title} ({formatNumber(totalCount)})</span>
          <button onClick={onClose} className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full transition text-gray-500">
            <X />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">{t.cart.empty}</div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {items.map((item) => {
                const basePrice = locale === 'en' ? (item.dollar_price || 0) : (item.price || 0);
                const fp = item.sale > 0
                  ? (locale === 'en'
                      ? Number((basePrice * (1 - item.sale / 100)).toFixed(2))
                      : Math.round(basePrice * (1 - item.sale / 100)))
                  : basePrice;
                const itemName = productName(item);
                return (
                  <div key={item._id} className="flex gap-3 items-center bg-gray-50 rounded-xl p-2.5 sm:p-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white border border-gray-100 overflow-hidden shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={itemName} width={100} height={100} className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">{t.common.questionMark}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">{itemName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatPrice(fp, locale)}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQty(item._id, item.qty - 1)} className="cursor-pointer w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold transition">−</button>
                        <span className="text-sm font-medium w-4 text-center">{formatNumber(item.qty)}</span>
                        <button onClick={() => updateQty(item._id, item.qty + 1)} className="cursor-pointer w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold transition">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="cursor-pointer p-1 text-gray-400 hover:text-red-500 transition shrink-0">
                      <X size={20} strokeWidth={1.75} />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="p-3 sm:p-4 border-t border-gray-100 space-y-3">
              <div className="flex justify-between text-sm font-bold text-gray-900">
                <span>{t.cart.total}</span>
                <span>{formatPrice(totalPrice, locale)}</span>
              </div>
              <button
                disabled
                title={t.cart.notReady}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-xl text-sm opacity-50 cursor-not-allowed"
              >
                {t.cart.placeOrder}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

