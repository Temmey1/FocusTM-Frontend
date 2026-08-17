"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatNaira, api } from "@/lib/api";
import { getDeliveryLocations, getPickupLocations } from "@/lib/locations";
import { DeliveryMethod, PaymentMethod, DeliveryLocation } from "@/types";
import toast from "react-hot-toast";

const inputCls  = "w-full bg-transparent border border-ftm-line px-4 py-3 text-[12px] text-ftm-white placeholder:text-ftm-dim focus:border-ftm-offwhite outline-none transition-colors";
const selectCls = "w-full bg-ftm-black border border-ftm-line px-4 py-3 text-[12px] text-ftm-white focus:border-ftm-offwhite outline-none transition-colors appearance-none cursor-pointer";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone]       = useState("");
  const [email, setEmail]       = useState("");
  const [method, setMethod]     = useState<DeliveryMethod>("delivery");
  const [note, setNote]         = useState("");
  const [address, setAddress]   = useState("");
  const [city, setCity]         = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("whatsapp");
  const [submitting, setSubmitting]       = useState(false);

  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocation[]>([]);
  const [pickupLocations, setPickupLocations]     = useState<DeliveryLocation[]>([]);
  const [selectedState, setSelectedState]         = useState("");
  const [selectedPickupId, setSelectedPickupId]   = useState("");
  const [locationsLoading, setLocationsLoading]   = useState(true);

  useEffect(() => {
    Promise.all([getDeliveryLocations(), getPickupLocations()]).then(([d, p]) => {
      setDeliveryLocations(d);
      setPickupLocations(p);
      if (d[0]) setSelectedState(d[0].state);
      if (p[0]) setSelectedPickupId(p[0].id);
      setLocationsLoading(false);
    });
  }, []);

  const activeDeliveryLoc = deliveryLocations.find((l) => l.state === selectedState);
  const activePickupLoc   = pickupLocations.find((l) => l.id === selectedPickupId);
  const deliveryFee = method === "delivery" ? (activeDeliveryLoc?.fee ?? 2500) : 0;
  const total = subtotal() + deliveryFee;

  const handleSubmit = async () => {
    if (!fullName || !phone) { toast.error("Please enter your name and phone number."); return; }
    if (method === "delivery" && (!selectedState || !address)) { toast.error("Please select a state and enter your address."); return; }
    if (method === "pickup" && !selectedPickupId) { toast.error("Please select a pickup location."); return; }
    if (items.length === 0) { toast.error("Your bag is empty."); return; }

    setSubmitting(true);
    try {
      const payload = {
        items, subtotal: subtotal(), deliveryFee, total,
        delivery: {
          fullName, phone, email, method,
          state: method === "delivery" ? selectedState : activePickupLoc?.state || "",
          city: method === "delivery" ? city : activePickupLoc?.city || "",
          address: method === "delivery" ? address : activePickupLoc?.address,
          note,
        },
        paymentMethod,
      };

      const res = await api.post("/orders", payload);
      const orderNumber = res.data?.orderNumber || res.data?.id;

      clearCart();

      if (paymentMethod === "monnify" && res.data?.monnifyCheckoutUrl) {
        window.location.href = res.data.monnifyCheckoutUrl;
        return;
      }

      router.push(`/checkout/success?order=${orderNumber}&method=${paymentMethod}&total=${total}&name=${encodeURIComponent(fullName)}`);
    } catch {
      toast.error("Something went wrong placing your order. Please try again.");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 pt-36 pb-28 grid grid-cols-1 md:grid-cols-3 gap-14">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 flex flex-col gap-10">
        <h1 className="font-display font-light text-[clamp(32px,4.5vw,52px)]">Checkout</h1>

        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-5">Contact & Delivery</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Full name *" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
            <input placeholder="Phone number *" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
            <input placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} sm:col-span-2`} />
          </div>
        </div>

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

        {locationsLoading ? (
          <div className="h-24 ftm-skeleton" />
        ) : method === "delivery" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className={selectCls}>
                {deliveryLocations.map((l) => (
                  <option key={l.id} value={l.state}>{l.state} — {l.fee === 0 ? "Free" : formatNaira(l.fee)}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ftm-muted text-xs">▾</span>
            </div>
            <input placeholder="City / Town" value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
            <textarea placeholder="Full delivery address *" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className={`${inputCls} sm:col-span-2 resize-none`} />
          </div>
        ) : pickupLocations.length === 0 ? (
          <p className="text-[12px] text-ftm-muted border border-ftm-line p-5">No pickup locations are configured yet — please choose Home Delivery instead.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {pickupLocations.map((l) => (
              <button key={l.id} onClick={() => setSelectedPickupId(l.id)}
                className={`text-left px-5 py-4 border transition-all duration-200 ${selectedPickupId === l.id ? "border-ftm-white" : "border-ftm-line hover:border-ftm-linelt"}`}
              >
                <p className="text-[11px] uppercase tracking-[0.15em] text-ftm-white">{l.state}{l.city ? `, ${l.city}` : ""}</p>
                <p className="text-[11px] text-ftm-dim mt-1">{l.address}</p>
              </button>
            ))}
          </div>
        )}

        <textarea placeholder="Order note (optional)" value={note} onChange={(e) => setNote(e.target.value)} rows={2} className={`${inputCls} resize-none`} />

        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-4">Payment</p>
          <div className="flex flex-col gap-3">
            {([
              { id: "whatsapp", title: "Order via WhatsApp", sub: "Confirm and pay directly with our team." },
              { id: "monnify",  title: "Pay Online (Monnify)", sub: "Secure card / bank transfer checkout." },
            ] as { id: PaymentMethod; title: string; sub: string }[]).map((opt) => (
              <button key={opt.id} onClick={() => setPaymentMethod(opt.id)}
                className={`text-left px-6 py-4 border transition-all duration-200 ${paymentMethod === opt.id ? "border-ftm-white" : "border-ftm-line hover:border-ftm-linelt"}`}
              >
                <p className={`text-[10px] uppercase tracking-[0.18em] ${paymentMethod === opt.id ? "text-ftm-white" : "text-ftm-muted"}`}>{opt.title}</p>
                <p className="text-[11px] text-ftm-dim mt-1">{opt.sub}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

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
        <div className="flex justify-between text-[11px] text-ftm-muted mb-2"><span>Subtotal</span><span>{formatNaira(subtotal())}</span></div>
        <div className="flex justify-between text-[11px] text-ftm-muted mb-5"><span>Delivery</span><span>{deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}</span></div>
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
