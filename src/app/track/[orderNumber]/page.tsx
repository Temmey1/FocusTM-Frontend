"use client";

import { useEffect, useState } from "react";
import { api, formatNaira } from "@/lib/api";
import { Package, Check } from "lucide-react";

const STEPS = ["pending", "paid", "processing", "shipped", "completed"];

interface TrackedOrder {
  orderNumber: string; status: string; createdAt: string;
  items: { name: string; quantity: number; price: number; size?: string; color?: string }[];
  subtotal: number; deliveryFee: number; total: number; paymentMethod: string;
  customerName: string; method: string; state: string; city?: string;
}

export default function TrackOrderPage({ params }: { params: { orderNumber: string } }) {
  const [order, setOrder]     = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    api.get(`/orders/track/${params.orderNumber}`)
      .then((r) => setOrder(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params.orderNumber]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-8 pt-40 pb-28">
        <div className="h-8 w-64 ftm-skeleton mb-8" />
        <div className="h-40 ftm-skeleton" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto px-8 pt-40 pb-28 text-center">
        <h1 className="font-display font-light text-[28px] mb-4">Order not found</h1>
        <p className="text-[13px] text-ftm-muted">Please check the order number and try again.</p>
      </div>
    );
  }

  const stepIndex = STEPS.indexOf(order.status);
  const cancelled = order.status === "cancelled";

  return (
    <div className="max-w-2xl mx-auto px-8 pt-36 pb-28">
      <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3">Order Tracking</p>
      <h1 className="font-display font-light text-[clamp(26px,4vw,40px)] mb-1 font-mono">#{order.orderNumber}</h1>
      <p className="text-[12px] text-ftm-muted mb-10">Placed {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>

      {/* status timeline */}
      {cancelled ? (
        <div className="border border-red-900/40 bg-red-950/10 p-5 mb-10">
          <p className="text-[12px] uppercase tracking-[0.15em] text-red-400">Order Cancelled</p>
        </div>
      ) : (
        <div className="flex items-center mb-12">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center border transition-colors ${
                  i <= stepIndex ? "bg-ftm-white border-ftm-white text-ftm-black" : "border-ftm-line text-ftm-dim"
                }`}>
                  {i <= stepIndex ? <Check className="h-3.5 w-3.5" /> : <span className="text-[9px]">{i+1}</span>}
                </div>
                <span className={`text-[8px] uppercase tracking-[0.12em] mt-2 capitalize ${i <= stepIndex ? "text-ftm-white" : "text-ftm-dim"}`}>{step}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-5 ${i < stepIndex ? "bg-ftm-white" : "bg-ftm-line"}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* items */}
      <div className="border border-ftm-line p-6 mb-6">
        <p className="text-[9px] uppercase tracking-[0.25em] text-ftm-muted mb-4 flex items-center gap-2">
          <Package className="h-3.5 w-3.5" /> Items
        </p>
        <div className="flex flex-col gap-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-[12px]">
              <span className="text-ftm-muted">{item.name} × {item.quantity}{item.size ? ` · ${item.size}` : ""}{item.color ? ` · ${item.color}` : ""}</span>
              <span>{formatNaira(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="ftm-divider-solid my-4" />
        <div className="flex justify-between text-[12px] text-ftm-muted mb-1"><span>Subtotal</span><span>{formatNaira(order.subtotal)}</span></div>
        <div className="flex justify-between text-[12px] text-ftm-muted mb-3"><span>Delivery</span><span>{formatNaira(order.deliveryFee)}</span></div>
        <div className="flex justify-between font-display text-[18px]"><span>Total</span><span>{formatNaira(order.total)}</span></div>
      </div>

      <div className="border border-ftm-line p-6">
        <p className="text-[9px] uppercase tracking-[0.25em] text-ftm-muted mb-3">Delivery</p>
        <p className="text-[12px] text-ftm-muted capitalize">{order.method} · {order.state}{order.city ? `, ${order.city}` : ""}</p>
      </div>
    </div>
  );
}
