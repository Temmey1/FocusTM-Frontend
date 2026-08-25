"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { api } from "@/lib/api";

const PAGE_SIZE = 8;

const categories = [
  { value: "",       label: "All"    },
  { value: "tops",   label: "Tops"   },
  { value: "shirts", label: "Shirts" },
  { value: "caps",   label: "Caps"   },
  { value: "wears",  label: "Wears"  },
];

function normalize<T extends { _id?: any; id?: string }>(doc: T): T & { id: string } {
  const anyDoc = doc as any;
  return { ...doc, id: anyDoc?.id ?? anyDoc?._id?.toString() ?? String(Math.random()) } as any;
}

export default function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const page = useMemo(() => Math.max(1, Math.ceil(products.length / PAGE_SIZE)), [products.length]);
  const hasMore = products.length < total;

  // Initial load + category change
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoaded(false);
      setError(false);
      try {
        const res = await api.get("/products", { params: { category: category || undefined, limit: PAGE_SIZE, skip: 0 } });
        if (!cancelled) {
          if (res && (res.data as any)?.data && Array.isArray((res.data as any).data)) {
            const d = (res.data as { data: any[]; total: number });
            setProducts(d.data.map((p) => normalize(p)));
            setTotal(d.total ?? d.data.length);
          } else if (res && Array.isArray(res.data)) {
            // Fallback: legacy array response (endpoint returned array because pagination was unsupported)
            const arr = res.data as any[];
            setProducts(arr.map((p) => normalize(p)));
            setTotal(arr.length);
          } else {
            setError(true);
          }
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [category]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const res = await api.get("/products", {
        params: { category: category || undefined, limit: PAGE_SIZE, skip: products.length },
      });
      if (res && (res.data as any)?.data && Array.isArray((res.data as any).data)) {
        const d = (res.data as { data: any[]; total: number });
        setProducts((prev) => [...prev, ...d.data.map((p) => normalize(p))]);
        setTotal(d.total ?? total);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const displayProducts = products;
  const displayTotal = total;
  const displayHasMore = hasMore;

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
        {categories.map((c) => {
          const active = category === c.value;
          return (
            <a
              key={c.value}
              href={c.value ? `/shop?category=${c.value}` : "/shop"}
              className={`px-5 py-2 text-[9px] uppercase tracking-[0.22em] border transition-all duration-200 ${
                active
                  ? "border-ftm-offwhite text-ftm-white"
                  : "border-ftm-line text-ftm-muted hover:border-ftm-offwhite hover:text-ftm-white"
              }`}
            >
              {c.label}
            </a>
          );
        })}
      </div>

      {/* skeleton while loading first page */}
      {!loaded && !error ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] ftm-skeleton mb-5" />
              <div className="h-4 w-16 ftm-skeleton mb-2" />
              <div className="h-5 w-3/4 ftm-skeleton mb-2" />
              <div className="h-5 w-24 ftm-skeleton" />
            </div>
          ))}
        </div>
      ) : displayProducts.length === 0 ? (
        <p className="text-center text-ftm-muted text-sm">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
            {displayProducts.map((p, i) => (
              <ProductCard product={p} key={p.id} index={i} />
            ))}
          </div>

          {displayHasMore && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-10 py-3.5 border border-ftm-line text-[10px] uppercase tracking-[0.22em] text-ftm-muted hover:text-ftm-white hover:border-ftm-offwhite transition-colors disabled:opacity-40"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          <p className="text-center text-[11px] text-ftm-dim mt-10">
            Showing {displayProducts.length} of {displayTotal}
          </p>
        </>
      )}
    </div>
  );
}
