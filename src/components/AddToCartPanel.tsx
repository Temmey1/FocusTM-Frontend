"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatNaira } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddToCartPanel({ product }: { product: Product }) {
  const [size,       setSize]       = useState(product.sizes[0] || "");
  const [color,      setColor]      = useState(product.colors[0] || "");
  const [quantity,   setQuantity]   = useState(1);
  const [customNote, setCustomNote] = useState("");
  const addItem  = useCartStore((s) => s.addItem);
  const router   = useRouter();

  const handleAdd = () => {
    addItem({ productId: product.id, name: product.name, image: product.images?.[0] || "", price: product.price, size, color, quantity, customNote: customNote || undefined });
    toast.success(`${product.name} added to bag`);
  };

  const handleBuyNow = () => { handleAdd(); router.push("/cart"); };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65 }}
      className="flex flex-col gap-7"
    >
      {/* title */}
      <div>
        <p className="text-[9px] uppercase tracking-[0.28em] text-ftm-muted mb-2">{product.category}</p>
        <h1 className="font-display font-light text-[clamp(28px,4vw,46px)] leading-tight mb-4">{product.name}</h1>
        <p className="font-display text-[24px]">{formatNaira(product.price)}</p>
      </div>

      <p className="text-[13px] text-ftm-muted leading-[1.85]">{product.description}</p>

      {/* sizes */}
      {product.sizes.length > 0 && (
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-ftm-muted mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className={`px-4 py-2 text-[11px] border transition-all duration-200 ${
                  size === s ? "border-ftm-white text-ftm-white" : "border-ftm-line text-ftm-muted hover:border-ftm-offwhite"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* colors */}
      {product.colors.length > 0 && (
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-ftm-muted mb-3">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button key={c} onClick={() => setColor(c)}
                className={`px-4 py-2 text-[11px] border transition-all duration-200 ${
                  color === c ? "border-ftm-white text-ftm-white" : "border-ftm-line text-ftm-muted hover:border-ftm-offwhite"
                }`}
              >{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* customization */}
      {product.customizable && (
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-ftm-muted mb-3">
            Customization <span className="normal-case tracking-normal text-ftm-dim">(optional — name, number, text)</span>
          </p>
          <input
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="e.g. Name: TIMOTHY, Number: 10"
            className="w-full bg-transparent border border-ftm-line px-4 py-3 text-[12px] text-ftm-white placeholder:text-ftm-dim focus:border-ftm-offwhite outline-none transition-colors"
          />
        </div>
      )}

      {/* quantity */}
      <div className="flex items-center gap-4">
        <p className="text-[9px] uppercase tracking-[0.25em] text-ftm-muted">Qty</p>
        <div className="flex items-center border border-ftm-line">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 text-ftm-muted hover:text-ftm-white transition-colors">−</button>
          <span className="px-5 text-[13px]">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 text-ftm-muted hover:text-ftm-white transition-colors">+</button>
        </div>
      </div>

      {/* actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-1">
        <button onClick={handleAdd}
          className="flex-1 px-8 py-4 border border-ftm-white text-ftm-white text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-white hover:text-ftm-black transition-all duration-250"
        >
          Add to Bag
        </button>
        <button onClick={handleBuyNow}
          className="flex-1 px-8 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors"
        >
          Buy Now
        </button>
      </div>
    </motion.div>
  );
}
