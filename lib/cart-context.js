'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');

      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Load cart failed:', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'cart',
        JSON.stringify(items)
      );
    } catch (err) {
      console.error('Save cart failed:', err);
    }
  }, [items]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find(
        (i) => i._id === product._id
      );

      if (exists) {
        return prev.map((i) =>
          i._id === product._id
            ? {
                ...i,
                qty: i.qty + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          en_name: product.en_name,
          price: product.price,
          dollar_price: product.dollar_price,
          sale: product.sale,
          image:
            product.media?.[0]?.url || null,
          qty: 1,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) =>
      prev.filter((i) => i._id !== id)
    );
  }, []);

  const updateQty = useCallback(
    (id, qty) => {
      if (qty < 1) {
        return removeItem(id);
      }

      setItems((prev) =>
        prev.map((i) =>
          i._id === id
            ? {
                ...i,
                qty,
              }
            : i
        )
      );
    },
    [removeItem]
  );

  const totalCount = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.qty,
      0
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      totalCount,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQty,
      totalCount,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      'useCart must be inside CartProvider'
    );
  }

  return ctx;
}