"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { api, formatNaira } from "@/lib/api";
import { Order } from "@/types";

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    api
      .get<Order[]>("/orders/my-orders")
      .then((r) => setOrders(r.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  if (!authLoading && !user) {
    return (
      <div className="max-w-md mx-auto px-8 pt-40 pb-28 text-center">
        <h1 className="font-display font-light text-[28px] mb-5">
          Sign in to view your orders
        </h1>
        <Link
          href="/account/login"
          className="inline-block px-8 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-8 pt-36 pb-28">
      <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3">
        Account
      </p>
      <h1 className="font-display font-light text-[clamp(28px,4vw,44px)] mb-10">
        My Orders
      </h1>

      {loading || authLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 ftm-skeleton" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-ftm-line p-10 text-center">
          <p className="text-[13px] text-ftm-muted mb-6">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.2em] hover:bg-ftm-offwhite transition-colors"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-ftm-line">
          {orders.map((o: any) => (
            <Link
              key={o.id}
              href={`/track/${o.orderNumber}`}
              className="bg-ftm-black p-5 flex items-center justify-between hover:bg-ftm-deep transition-colors"
            >
              <div>
                <p className="text-[12px] font-mono text-ftm-offwhite">
                  {o.orderNumber}
                </p>
                <p className="text-[11px] text-ftm-muted mt-1 capitalize">
                  {o.status} · {o.items?.length || 0} item(s)
                </p>
              </div>
              <p className="font-display text-[16px]">{formatNaira(o.total)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
