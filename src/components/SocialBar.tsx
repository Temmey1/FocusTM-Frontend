"use client";

import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/focus_tm_collection", icon: "ig"  },
  { label: "TikTok",    href: "https://www.tiktok.com/@focus__tm",             icon: "tt"  },
  { label: "Snapchat",  href: "https://snapchat.com/t/jIaJRbVx",               icon: "sc"  },
  { label: "WhatsApp",  href: "https://wa.me/2349025012714",                    icon: "wa"  },
];

export default function SocialBar() {
  return (
    <section id="contact" className="border-y border-ftm-line bg-ftm-deep">
      <div className="max-w-4xl mx-auto px-8 py-24 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-4">Stay Close</p>
          <h2 className="font-display font-light text-[clamp(28px,4.5vw,52px)] mb-4">
            Follow the <em>standard</em>
          </h2>
          <p className="text-[13px] text-ftm-muted leading-[1.9] mb-10 tracking-[0.04em]">
            Follow FocusTM Collection on Instagram, TikTok, Snapchat and WhatsApp.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-2 px-7 py-3 border border-ftm-line text-[9px] uppercase tracking-[0.22em] text-ftm-muted hover:border-ftm-offwhite hover:text-ftm-white transition-all duration-250 hover:-translate-y-[3px]"
            >
              {s.icon === "ig" && <Instagram className="h-3 w-3" />}
              {s.icon === "wa" && <MessageCircle className="h-3 w-3" />}
              {s.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
