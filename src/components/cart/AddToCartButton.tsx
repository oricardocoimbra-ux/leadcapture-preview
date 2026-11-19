"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

interface AddToCartButtonProps {
  productId: string;
  label?: string;
  className?: string;
}

export function AddToCartButton({
  productId,
  label = "Adicionar ao Carrinho",
  className = "lc-btn-secondary px-4 py-2 text-xs",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(productId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${className} inline-flex items-center justify-center gap-1.5`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#F5B800]" />
          <span>Adicionado</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
