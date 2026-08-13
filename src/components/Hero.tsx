"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ftm-black ftm-noise text-center px-6 pt-36 pb-24">

      {/* ambient glows */}
      <motion.div
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-white/[0.025] blur-[140px] pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-100px] right-[10%] h-[400px] w-[400px] rounded-full bg-white/[0.018] blur-[140px] pointer-events-none"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">

        {/* eyebrow with rules */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-12 bg-ftm-line block" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-ftm-muted">
            FocusTM Collection — Now Available
          </span>
          <span className="h-px w-12 bg-ftm-line block" />
        </motion.div>

        {/* logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mb-9"
        >
          <Image
            src="/logo.png"
            alt="FocusTM"
            width={110}
            height={110}
            className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.06)]"
            priority
          />
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-display font-light text-[clamp(44px,7.5vw,90px)] leading-[1.05] tracking-[-0.01em] mb-6"
        >
          Style meets confidence.<br />
          <em className="text-ftm-offwhite">Elegance meets excellence.</em>
        </motion.h1>

        {/* sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="text-[13px] leading-[1.9] tracking-[0.05em] text-ftm-muted max-w-md mx-auto mb-11"
        >
          Luxury and standard, truly for you.<br />
          This is more than a brand —&nbsp;
          <span className="text-ftm-white border-b border-ftm-offwhite pb-px">It&apos;s FTM.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.72 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/shop"
            className="px-10 py-4 bg-ftm-white text-ftm-black border border-ftm-white text-[10px] uppercase tracking-[0.22em] font-medium hover:bg-transparent hover:text-ftm-white transition-all duration-250"
          >
            Explore. Shop. Elevate
          </Link>
          <Link
            href="/#about"
            className="px-10 py-4 border border-ftm-line text-ftm-white text-[10px] uppercase tracking-[0.22em] hover:border-ftm-offwhite hover:text-ftm-offwhite transition-all duration-250"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.span
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.32em] text-ftm-dim"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll to discover
      </motion.span>
    </section>
  );
}
