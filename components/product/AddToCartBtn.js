'use client';

import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function AddToCartBtn({ product }) {
  const { addItem } = useCart();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => addItem(product)}
      className="cursor-pointer w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-3 rounded-xl transition text-sm"
    >
      {t.product.addToCart}
    </button>
  );
}
