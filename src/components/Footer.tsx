import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ftm-line bg-ftm-black mt-0">
      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* brand col */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image src="/logo.png" alt="FocusTM" width={30} height={30} className="object-contain" />
            <span className="font-heading text-[15px] tracking-[0.28em] uppercase">FocusTM</span>
          </div>
          <p className="text-[12px] text-ftm-muted leading-[1.85]">
            Excellence Is The Standard. Customized focus tops, shirts, caps and wears —
            built for those who lead. Based in Ikorodu, Lagos.
          </p>
        </div>

        {/* shop */}
        <div>
          <h4 className="text-[8px] uppercase tracking-[0.35em] text-ftm-dim mb-5">Shop</h4>
          <ul className="space-y-3 text-[12px] text-ftm-muted">
            {["tops", "shirts", "caps", "wears"].map((c) => (
              <li key={c}>
                <Link href={`/shop?category=${c}`} className="hover:text-ftm-white transition-colors capitalize">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* reach */}
        <div>
          <h4 className="text-[8px] uppercase tracking-[0.35em] text-ftm-dim mb-5">Contact</h4>
          <ul className="space-y-3 text-[12px] text-ftm-muted">
            <li>Ikorodu, Lagos, Nigeria</li>
            <li><Link href="/custom-order" className="hover:text-ftm-white transition-colors">Custom Order</Link></li>
            <li><Link href="/account" className="hover:text-ftm-white transition-colors">My Account</Link></li>
            <li>
              <a href="https://wa.me/2349025012714" target="_blank" className="hover:text-ftm-white transition-colors">
                +234 902 501 2714
              </a>
            </li>
          </ul>
        </div>

        {/* follow */}
        <div>
          <h4 className="text-[8px] uppercase tracking-[0.35em] text-ftm-dim mb-5">Follow</h4>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.instagram.com/focus_tm_collection" target="_blank" aria-label="Instagram"
               className="text-ftm-muted hover:text-ftm-white transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.tiktok.com/@focus__tm" target="_blank" aria-label="TikTok"
               className="text-[11px] font-medium text-ftm-muted hover:text-ftm-white transition-colors tracking-wider">
              TT
            </a>
            <a href="https://snapchat.com/t/jIaJRbVx" target="_blank" aria-label="Snapchat"
               className="text-[11px] font-medium text-ftm-muted hover:text-ftm-white transition-colors tracking-wider">
              SC
            </a>
            <a href="https://wa.me/2349025012714" target="_blank" aria-label="WhatsApp"
               className="text-ftm-muted hover:text-ftm-white transition-colors">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="ftm-divider-solid" />
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-[10px] text-ftm-dim">
          © {new Date().getFullYear()} FocusTM Collection. All rights reserved.
        </p>
        <p className="font-display italic text-[13px] text-ftm-muted">
          Excellence Is The Standard
        </p>
      </div>
    </footer>
  );
}
