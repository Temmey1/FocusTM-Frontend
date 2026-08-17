"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatNaira } from "@/lib/api";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-8 pt-44 pb-28 text-center">
        <h1 className="font-display font-light text-[clamp(28px,4vw,48px)] mb-5">Your bag is empty</h1>
        <p className="text-[13px] text-ftm-muted mb-10 leading-[1.85]">
          Explore the collection and find your standard.
        </p>
        <Link href="/shop"
          className="inline-block px-10 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 pt-36 pb-28">
      <h1 className="font-display font-light text-[clamp(32px,4.5vw,52px)] mb-12">Your Bag</h1>

      <div className="flex flex-col gap-px bg-ftm-line">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={`${item.productId}-${item.size}-${item.color}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-6 bg-ftm-black p-5"
            >
              {/* image */}
              <div className="relative h-24 w-20 bg-ftm-charcoal flex-shrink-0 overflow-hidden border border-ftm-line">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Image src="/logo.png" alt="" width={32} height={32} className="opacity-10 object-contain" />
                  </div>
                )}
              </div>

              {/* details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[12px] uppercase tracking-[0.15em] text-ftm-white truncate">{item.name}</h3>
                <p className="text-ftm-muted text-[11px] mt-1">
                  {item.size} · {item.color}{item.customNote ? ` · ${item.customNote}` : ""}
                </p>
                <p className="font-display text-[16px] mt-2">{formatNaira(item.price)}</p>
              </div>

              {/* qty */}
              <div className="flex items-center border border-ftm-line">
                <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                  className="px-3 py-2 text-ftm-muted hover:text-ftm-white transition-colors text-sm">−</button>
                <span className="px-4 text-[13px]">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                  className="px-3 py-2 text-ftm-muted hover:text-ftm-white transition-colors text-sm">+</button>
              </div>

              {/* remove */}
              <button onClick={() => removeItem(item.productId, item.size, item.color)}
                className="text-ftm-dim hover:text-red-400 transition-colors ml-2" aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* summary */}
      <div className="mt-14 flex flex-col items-end gap-4">
        <div className="flex justify-between w-full max-w-xs text-[13px]">
          <span className="text-ftm-muted uppercase tracking-[0.12em]">Subtotal</span>
          <span className="font-display text-[18px]">{formatNaira(subtotal())}</span>
        </div>
        <p className="text-[11px] text-ftm-dim max-w-xs text-right">
          Delivery fee calculated at checkout based on your location.
        </p>
        <Link href="/checkout"
          className="px-12 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
