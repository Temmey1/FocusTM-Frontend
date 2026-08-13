"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "Customized",
    body: "Every piece is tailored — focus tops, shirts, caps and wears built around your identity. Your name, your number, your standard.",
  },
  {
    num: "02",
    title: "Excellence",
    body: "From fabric to finish, the standard is never compromised. Quality you can see, touch, and wear with total confidence.",
  },
  {
    num: "03",
    title: "Elevation",
    body: "More than clothing — a statement. FocusTM is for those who lead with intention and refuse to be ordinary.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-8 py-28">

      {/* intro */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85 }}
        className="text-center max-w-[520px] mx-auto mb-20"
      >
        <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-4">The FTM Story</p>
        <h2 className="font-display font-light text-[clamp(30px,4.5vw,56px)] leading-[1.1] mb-5">
          More than<br /><em>a brand</em>
        </h2>
        <p className="text-[13px] leading-[1.9] text-ftm-muted">
          Welcome to a world where luxury and standard belong to you. FocusTM Collection was built
          for a generation that refuses to blend in — where every piece is a declaration.
        </p>
      </motion.div>

      {/* pillars — 1px grid look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ftm-line">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: i * 0.12 }}
            className="relative bg-ftm-black px-10 py-12 group overflow-hidden"
          >
            {/* top border slide */}
            <span className="absolute top-0 left-0 right-0 h-px bg-ftm-white scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] origin-left" />

            <span className="font-heading text-[52px] text-ftm-line group-hover:text-ftm-linelt leading-none transition-colors duration-300">
              {p.num}
            </span>
            <h3 className="font-display text-[22px] font-normal mt-5 mb-3 text-ftm-offwhite">
              {p.title}
            </h3>
            <p className="text-[13px] text-ftm-muted leading-[1.8]">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
