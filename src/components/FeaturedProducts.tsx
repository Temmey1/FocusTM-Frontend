import Link from "next/link";
import ProductCard from "./ProductCard";
import { getProductsServer } from "@/lib/products";

export default async function FeaturedProducts() {
  const products = await getProductsServer();
  const featured  = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3">Curated</p>
          <h2 className="font-display font-light text-[clamp(28px,4vw,52px)]">
            Featured <em>Pieces</em>
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden sm:inline text-[10px] uppercase tracking-[0.22em] text-ftm-muted hover:text-ftm-white border-b border-ftm-line hover:border-ftm-offwhite pb-px transition-all duration-200"
        >
          View All →
        </Link>
      </div>

      {/* 1-px grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
        {featured.map((p, i) => (
          <ProductCard product={p} key={p.id} index={i} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/shop"
          className="text-[10px] uppercase tracking-[0.22em] text-ftm-muted hover:text-ftm-white transition-colors border-b border-ftm-line pb-px"
        >
          View All →
        </Link>
      </div>
    </section>
  );
}
