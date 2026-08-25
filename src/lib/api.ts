import axios from "axios";
import { auth } from "@/lib/firebase";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

// Attach Firebase ID token automatically if a user is signed in.
// Guest checkout still works since the backend allows unauthenticated order creation.
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export const buildWhatsAppMessage = (orderId: string, total: number, name: string) => {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2349025012714";
  const text = encodeURIComponent(
    `Hello FocusTM, I just placed an order with ref: #${orderId} (${name}) totaling ${formatNaira(
      total
    )}. I'd like to confirm to make payment.`
  );
  return `https://wa.me/${number}?text=${text}`;
};
