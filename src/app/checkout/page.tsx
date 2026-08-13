"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatNaira, buildWhatsAppMessage, api } from "@/lib/api";
import { nigeriaStates } from "@/lib/nigeriaStates";
import { DeliveryMethod, PaymentMethod } from "@/types";
import toast from "react-hot-toast";

const DELIVERY_FEE = 2500;

const inputCls = "w-full bg-transparent border border-ftm-line px-4 py-3 text-[12px] text-ftm-white placeholder:text-ftm-dim focus:border-ftm-offwhite outline-none transition-colors";
const selectCls = "w-full bg-ftm-black border border-ftm-line px-4 py-3 text-[12px] text-ftm-white focus:border-ftm-offwhite outline-none transition-colors appearance-none cursor-pointer";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();

  const [fullName, setFullName]         = useState("");
  const [phone, setPhone]               = useState("");
  const [email, setEmail]               = useState("");
  const [method, setMethod]             = useState<DeliveryMethod>("delivery");
  const [state, setState]               = useState("Lagos");
  const [city, setCity]                 = useState("");
  const [address, setAddress]           = useState("");
  const [note, setNote]                 = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("whatsapp");
  const [submitting, setSubmitting]     = useState(false);

  const deliveryFee = method === "delivery" ? DELIVERY_FEE : 0;
  const total       = subtotal() + deliveryFee;

  const handleSubmit = async () => {
    if (!fullName || !phone || !state || (method === "delivery" && !address)) {
      toast.error("Please complete all required delivery fields.");
      return;
    }
    if (items.length === 0) { toast.error("Your bag is empty."); return; }

    setSubmitting(true);
    try {
      const payload = { items, subtotal: subtotal(), deliveryFee, total, delivery: { fullName, phone, email, method, state, city, address, note }, paymentMethod };
      const res = await api.post("/orders", payload).catch(async () => {
        const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        return { data: await r.json() };
      });

      const orderId = res.data?.orderNumber || res.data?.id || `FTM-${Date.now()}`;

      if (paymentMethod === "whatsapp") {
        clearCart();
        window.open(buildWhatsAppMessage(orderId, total, fullName), "_blank");
        toast.success("Order placed — confirm on WhatsApp");
        router.push("/");
      } else {
        const redirectUrl = res.data?.monnifyCheckoutUrl;
        if (redirectUrl) { clearCart(); window.location.href = redirectUrl; }
        else toast.error("Monnify setup in progress — please use WhatsApp checkout for now.");
      }
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 pt-36 pb-28 grid grid-cols-1 md:grid-cols-3 gap-14">

      {/* left — form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 flex flex-col gap-10">
        <h1 className="font-display font-light text-[clamp(32px,4.5vw,52px)]">Checkout</h1>

        {/* contact */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-5">Contact & Delivery</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Full name *" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
            <input placeholder="Phone number *" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
            <input placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} sm:col-span-2`} />
          </div>
        </div>

        {/* method */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-4">Fulfillment Method</p>
          <div className="flex gap-3">
            {(["delivery", "pickup"] as DeliveryMethod[]).map((m) => (
              <button key={m} onClick={() => setMethod(m)}
                className={`flex-1 px-5 py-3 border text-[10px] uppercase tracking-[0.18em] transition-all duration-200 ${
                  method === m ? "border-ftm-white text-ftm-white" : "border-ftm-line text-ftm-muted hover:border-ftm-offwhite"
                }`}
              >
                {m === "delivery" ? "Home Delivery" : "Store Pickup"}
              </button>
            ))}
          </div>
        </div>

        {/* location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <select value={state} onChange={(e) => setState(e.target.value)} className={selectCls}>
              {nigeriaStates.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ftm-muted text-xs">▾</span>
          </div>
          <input placeholder="City / Town" value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
          {method === "delivery" && (
            <textarea placeholder="Full delivery address *" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className={`${inputCls} sm:col-span-2 resize-none`} />
          )}
          <textarea placeholder="Order note (optional)" value={note} onChange={(e) => setNote(e.target.value)} rows={2} className={`${inputCls} sm:col-span-2 resize-none`} />
        </div>

        {/* payment */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-4">Payment</p>
          <div className="flex flex-col gap-3">
            {([
              { id: "whatsapp", title: "Order via WhatsApp",     sub: "Confirm and pay directly with our team." },
              { id: "monnify",  title: "Pay Online (Monnify)",   sub: "Secure card / bank transfer checkout."  },
            ] as { id: PaymentMethod; title: string; sub: string }[]).map((opt) => (
              <button key={opt.id} onClick={() => setPaymentMethod(opt.id)}
                className={`text-left px-6 py-4 border transition-all duration-200 ${
                  paymentMethod === opt.id ? "border-ftm-white" : "border-ftm-line hover:border-ftm-linelt"
                }`}
              >
                <p className={`text-[10px] uppercase tracking-[0.18em] ${paymentMethod === opt.id ? "text-ftm-white" : "text-ftm-muted"}`}>{opt.title}</p>
                <p className="text-[11px] text-ftm-dim mt-1">{opt.sub}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* right — summary */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="border border-ftm-line p-7 h-fit sticky top-28">
        <h2 className="font-display font-light text-[22px] mb-7">Order Summary</h2>
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-[11px] text-ftm-muted">
              <span className="truncate pr-2">{item.name} × {item.quantity}</span>
              <span className="shrink-0">{formatNaira(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="ftm-divider-solid mb-4" />
        <div className="flex justify-between text-[11px] text-ftm-muted mb-2">
          <span>Subtotal</span><span>{formatNaira(subtotal())}</span>
        </div>
        <div className="flex justify-between text-[11px] text-ftm-muted mb-5">
          <span>Delivery</span>
          <span>{deliveryFee === 0 ? "Free (Pickup)" : formatNaira(deliveryFee)}</span>
        </div>
        <div className="ftm-divider-solid mb-5" />
        <div className="flex justify-between mb-8">
          <span className="text-[11px] uppercase tracking-[0.15em] text-ftm-muted">Total</span>
          <span className="font-display text-[20px]">{formatNaira(total)}</span>
        </div>
        <button onClick={handleSubmit} disabled={submitting}
          className="w-full px-6 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors disabled:opacity-40"
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </motion.div>
    </div>
  );
}
