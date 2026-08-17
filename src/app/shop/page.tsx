import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore FocusTM Collection — customized focus tops, shirts, caps and wears. Excellence Is The Standard.",
};

const categories = [
  { value: "",       label: "All"    },
  { value: "tops",   label: "Tops"   },
  { value: "shirts", label: "Shirts" },
  { value: "caps",   label: "Caps"   },
  { value: "wears",  label: "Wears"  },
];

export default async function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || "";
  const products  = await getProducts(category ? { category } : undefined);

  return (
    <div className="max-w-7xl mx-auto px-8 pt-36 pb-28">

      {/* header */}
      <div className="text-center mb-16">
        <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-4">The Collection</p>
        <h1 className="font-display font-light text-[clamp(36px,5vw,64px)]">
          Explore. <em>Shop.</em> Elevate
        </h1>
      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-16">
        {categories.map((c) => (
          <a
            key={c.value}
            href={c.value ? `/shop?category=${c.value}` : "/shop"}
            className={`px-5 py-2 text-[9px] uppercase tracking-[0.22em] border transition-all duration-200 ${
              category === c.value
                ? "border-ftm-offwhite text-ftm-white"
                : "border-ftm-line text-ftm-muted hover:border-ftm-offwhite hover:text-ftm-white"
            }`}
          >
            {c.label}
          </a>
        ))}
      </div>

      {/* grid — 1px lines */}
      {products.length === 0 ? (
        <p className="text-center text-ftm-muted text-sm">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
          {products.map((p, i) => (
            <ProductCard product={p} key={p.id} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
