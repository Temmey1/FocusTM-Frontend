# FocusTM Store

Customer-facing storefront: Landing page, Shop, Cart, Checkout.

## Stack
Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Zustand (cart) · Firebase Auth (optional, guest checkout supported)

## Dev
```bash
npm install
cp .env.example .env.local  # fill in Firebase + API URL
npm run dev                  # http://localhost:3000
```

## Deploy → Vercel
- Build command: `npm run build`
- Output: `.next`
- Env vars: all `NEXT_PUBLIC_*` from `.env.example`
- Custom domain: `focustm.com`
