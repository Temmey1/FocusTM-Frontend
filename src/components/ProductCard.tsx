"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatNaira } from "@/lib/api";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="group bg-ftm-black"
    >
      <Link href={`/shop/${product.slug}`}>
        {/* image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-ftm-charcoal cursor-pointer">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-[1.06] transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="FocusTM"
                width={80}
                height={80}
                className="object-contain opacity-[0.10]"
              />
            </div>
          )}

          {/* tag */}
          {product.customizable && (
            <span className="absolute top-0 left-0 bg-ftm-white text-ftm-black text-[8px] uppercase tracking-[0.18em] font-medium px-[10px] py-[5px]">
              Customizable
            </span>
          )}

          {/* hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ftm-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
            <span className="bg-ftm-white text-ftm-black text-[9px] uppercase tracking-[0.2em] font-medium px-7 py-[10px]">
              View
            </span>
          </div>
        </div>

        {/* info */}
        <div className="border-t border-ftm-line px-1 pt-4 pb-5">
          <p className="text-[8px] uppercase tracking-[0.28em] text-ftm-muted mb-[6px]">
            {product.category}
          </p>
          <h3 className="font-display text-[16px] font-normal text-ftm-offwhite leading-snug mb-[6px] group-hover:text-ftm-white transition-colors duration-200">
            {product.name}
          </h3>
          <p className="font-display text-[17px] text-ftm-white">{formatNaira(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
