"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { formatNaira, buildWhatsAppMessage } from "@/lib/api";

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const order  = params.get("order") || "";
  const method = params.get("method") || "whatsapp";
  const total  = Number(params.get("total") || 0);
  const name   = params.get("name") || "";

  return (
    <div className="max-w-lg mx-auto px-8 pt-40 pb-28 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <CheckCircle2 className="h-14 w-14 mx-auto mb-6 text-ftm-white" strokeWidth={1} />
      </motion.div>

      <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3">Order Received</p>
      <h1 className="font-display font-light text-[clamp(28px,4vw,44px)] mb-4">Thank you{name ? `, ${name.split(" ")[0]}` : ""}</h1>
      <p className="text-[13px] text-ftm-muted leading-[1.85] mb-2">
        Your order <span className="text-ftm-white font-mono">#{order}</span> has been received.
      </p>
      {total > 0 && <p className="font-display text-[22px] mb-8">{formatNaira(total)}</p>}

      {method === "whatsapp" ? (
        <p className="text-[12px] text-ftm-muted leading-[1.8] mb-8">
          Tap below to confirm your order and complete payment directly with our team on WhatsApp.
        </p>
      ) : (
        <p className="text-[12px] text-ftm-muted leading-[1.8] mb-8">
          We&apos;ve received your order and will begin processing once payment is confirmed.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {method === "whatsapp" && (
          <a href={buildWhatsAppMessage(order, total, name)} target="_blank" rel="noreferrer"
            className="px-8 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors"
          >
            Message Us on WhatsApp
          </a>
        )}
        <Link href={`/track/${order}`} className="px-8 py-4 border border-ftm-line text-[10px] uppercase tracking-[0.22em] hover:border-ftm-offwhite transition-colors">
          Track Your Order
        </Link>
      </div>

      <Link href="/shop" className="block mt-10 text-[11px] text-ftm-dim hover:text-ftm-muted transition-colors underline-slide">
        Continue Shopping
      </Link>
    </div>
  );
}
