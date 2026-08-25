"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Callout() {
  return (
    <section className="relative overflow-hidden border-y border-ftm-line bg-ftm-deep py-28 px-8 text-center">
      {/* ghost logo watermark */}
      <Image
        src="/logo.png"
        alt=""
        width={400}
        height={400}
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] scale-[2.5] pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="font-display font-light text-[clamp(34px,5.5vw,68px)] leading-[1.1] mb-6"
        >
          It&apos;s not just what you wear.<br />
          <em>It&apos;s who you are.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[13px] text-ftm-muted leading-[1.9] tracking-[0.04em] mb-10"
        >
          Ikorodu, Lagos, Nigeria — shipped nationwide.<br />
          Order via WhatsApp. Excellence delivered to your door.
        </motion.p>

        <motion.a
          href="https://wa.me/2349025012714"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="inline-block px-10 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors"
        >
          Order on WhatsApp
        </motion.a>
      </div>
    </section>
  );
}
