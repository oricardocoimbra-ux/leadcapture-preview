"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  calculateCartFromCatalog,
  type CartLineInput,
  type CartSummary,
} from "@/lib/billing/cart-calculator";
import { supabase } from "@/lib/supabase";

interface CartContextValue {
  items: CartLineInput[];
  summary: CartSummary;
  totalCount: number;
  totalOneTime: number;
  totalMonthly: number;
  totalYearly: number;
  initialAmount: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "leadcapture_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineInput[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // ---------- Local storage hydration ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore storage errors
    } finally {
      setHydrated(true);
    }
  }, []);

  // ---------- Persist to local storage (visitors) ----------
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated]);

  // ---------- Supabase auth subscription ----------
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const newUserId = session?.user?.id ?? null;
      setUserId(newUserId);
    });
    // Initialise current session
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
    })();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // ---------- Merge helper (local + remote) ----------
  const mergeCarts = (local: CartLineInput[], remote: CartLineInput[]): CartLineInput[] => {
    const map = new Map<string, number>();
    local.forEach(({ productId, quantity }) => {
      map.set(productId, (map.get(productId) ?? 0) + quantity);
    });
    remote.forEach(({ productId, quantity }) => {
      map.set(productId, (map.get(productId) ?? 0) + quantity);
    });
    return Array.from(map.entries()).map(([productId, quantity]) => ({ productId, quantity }));
  };

  // ---------- Sync with Supabase (authenticated users) ----------
  useEffect(() => {
    if (!hydrated || !userId) return;
    const sync = async () => {
      setIsSyncing(true);
      // Load remote cart
      const { data: remote, error: fetchErr } = await supabase
        .from("carts")
        .select("items")
        .eq("user_id", userId)
        .single();

      let remoteItems: CartLineInput[] = [];
      if (!fetchErr && remote && (remote as any).items) {
        remoteItems = (remote as any).items as CartLineInput[];
      }

      // Merge with local items (sum quantities)
      const merged = mergeCarts(items, remoteItems);
      setItems(merged);

      // Upsert merged cart back to Supabase
      const { error: upErr } = await supabase
        .from("carts")
        .upsert({ user_id: userId, items: merged }, { onConflict: "user_id" });
      if (upErr) console.warn("Cart sync upsert error", upErr);
      setIsSyncing(false);
    };
    sync();
  }, [hydrated, userId]);

  // ---------- Persist changes to Supabase when items change (authenticated) ----------
  useEffect(() => {
    if (!hydrated || !userId || isSyncing) return;
    const persist = async () => {
      const { error } = await supabase
        .from("carts")
        .upsert({ user_id: userId, items }, { onConflict: "user_id" });
      if (error) console.warn("Cart persistence error", error);
    };
    persist();
  }, [items, hydrated, userId, isSyncing]);

  // ---------- Cart manipulation methods ----------
  const addItem = (productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  // ---------- Derived calculations ----------
  const summary = useMemo(() => calculateCartFromCatalog(items), [items]);
  const totalCount = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);
  const totalOneTime = summary.oneTimeTotal;
  const totalMonthly = summary.monthlyInitialTotal;
  const totalYearly = summary.annualInitialTotal;
  const initialAmount = summary.dueTodayTotal;

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        totalCount,
        totalOneTime,
        totalMonthly,
        totalYearly,
        initialAmount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
