"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";

const ITEM_TYPES = ["Custom Tee / Shirt", "Custom Hoodie", "Custom Cap", "Custom Wear", "Other"];
const inputCls = "w-full bg-transparent border border-ftm-line px-4 py-3 text-[12px] text-ftm-white placeholder:text-ftm-dim focus:border-ftm-offwhite outline-none transition-colors";
const selectCls = "w-full bg-ftm-black border border-ftm-line px-4 py-3 text-[12px] text-ftm-white focus:border-ftm-offwhite outline-none transition-colors appearance-none";

export default function CustomOrderPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone]       = useState("");
  const [email, setEmail]       = useState("");
  const [itemType, setItemType] = useState(ITEM_TYPES[0]);
  const [description, setDescription] = useState("");
  const [budget, setBudget]     = useState("");
  const [refImages, setRefImages] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]         = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!fullName || !phone || !description) { toast.error("Name, phone and description are required."); return; }
    setSubmitting(true);
    try {
      const res = await api.post("/custom-orders", {
        fullName, phone, email: email || undefined, itemType, description,
        budget: budget || undefined,
        referenceImages: refImages ? refImages.split(",").map((s) => s.trim()).filter(Boolean) : [],
      });
      setDone(res.data?.requestNumber || "received");
      toast.success("Request submitted");
    } catch {
      toast.error("Something went wrong. Please try again or reach us on WhatsApp.");
    } finally { setSubmitting(false); }
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-8 pt-40 pb-28 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <CheckCircle2 className="h-14 w-14 mx-auto mb-6 text-ftm-white" strokeWidth={1} />
        </motion.div>
        <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3">Request Received</p>
        <h1 className="font-display font-light text-[28px] mb-4">We&apos;ve got your request</h1>
        <p className="text-[13px] text-ftm-muted leading-[1.85] mb-2">
          Reference: <span className="text-ftm-white font-mono">{done}</span>
        </p>
        <p className="text-[13px] text-ftm-muted leading-[1.85]">
          Our team will reach out via phone, email or WhatsApp with pricing and next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-8 pt-36 pb-28">
      <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3 text-center">Made For You</p>
      <h1 className="font-display font-light text-[clamp(28px,4.5vw,44px)] text-center mb-4">Custom Order Request</h1>
      <p className="text-[13px] text-ftm-muted text-center leading-[1.85] mb-12 max-w-md mx-auto">
        Have something specific in mind? Tell us what you&apos;re looking for and our team will get back to you with pricing and timeline.
      </p>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Full name *" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
          <input placeholder="Phone number *" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
        </div>
        <input placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />

        <div className="relative">
          <select value={itemType} onChange={(e) => setItemType(e.target.value)} className={selectCls}>
            {ITEM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ftm-muted text-xs">▾</span>
        </div>

        <textarea placeholder="Describe what you'd like — design, colors, sizes, quantity, deadline... *" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className={`${inputCls} resize-none`} />
        <input placeholder="Budget (optional, e.g. ₦20,000 - ₦30,000)" value={budget} onChange={(e) => setBudget(e.target.value)} className={inputCls} />
        <input placeholder="Reference image URLs, comma separated (optional)" value={refImages} onChange={(e) => setRefImages(e.target.value)} className={inputCls} />

        <button onClick={handleSubmit} disabled={submitting}
          className="mt-2 w-full py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors disabled:opacity-40"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
