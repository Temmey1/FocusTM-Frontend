"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const links = [
  { href: "/",        label: "Home"    },
  { href: "/shop",    label: "Shop"    },
  { href: "/#about",  label: "About"   },
  { href: "/#contact",label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalQuantity           = useCartStore((s) => s.totalQuantity());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ftm-black/92 backdrop-blur-xl border-b border-ftm-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 text-ftm-white group">
          <Image
            src="/logo.png"
            alt="FocusTM"
            width={34}
            height={34}
            className="object-contain"
          />
          <span className="font-heading text-[17px] tracking-[0.32em] uppercase">
            FocusTM
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[10px] uppercase tracking-[0.22em] text-ftm-muted hover:text-ftm-white transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative group">
            <ShoppingBag className="h-[18px] w-[18px] text-ftm-muted group-hover:text-ftm-white transition-colors" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-ftm-white text-ftm-black text-[9px] font-semibold rounded-full h-[17px] w-[17px] flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          <button className="md:hidden text-ftm-muted hover:text-ftm-white transition-colors" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-ftm-deep border-t border-ftm-line"
          >
            <div className="flex flex-col px-8 py-6 gap-5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[10px] uppercase tracking-[0.25em] text-ftm-muted hover:text-ftm-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
