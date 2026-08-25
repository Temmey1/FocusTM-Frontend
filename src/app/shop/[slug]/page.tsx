"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { mockProducts } from "@/lib/mockProducts";
import AddToCartPanel from "@/components/AddToCartPanel";
import ProductLoading from "./loading";

function normalize<T extends { _id?: any; id?: string }>(doc: T): T & { id: string } {
  const anyDoc = doc as any;
  return { ...doc, id: anyDoc?.id ?? anyDoc?._id?.toString() ?? String(Math.random()) } as any;
}

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const load = async () => {
      setLoaded(false);
      setError(false);
      try {
        const res = await api.get<Product>(`/products/slug/${slug}`);
        if (!cancelled) {
          if (res?.data) {
            setProduct(normalize(res.data as any));
          } else {
            const m = mockProducts.find((p) => p.slug === slug) || null;
            if (m) setProduct(m); else setError(true);
          }
        }
      } catch {
        if (!cancelled) {
          const m = mockProducts.find((p) => p.slug === slug) || null;
          if (m) {
            setProduct(m);
          } else {
            setError(true);
          }
        }
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (!loaded) return <ProductLoading />;

  if (error || !product) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.length ? product.images : ["/logo.png"],
    brand: { "@type": "Brand", name: "FocusTM Collection" },
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative aspect-[3/4] bg-ftm-charcoal border border-ftm-line overflow-hidden">
        {product.images?.[0] ? (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-ftm-white/30 uppercase tracking-widest2 text-sm">
            FocusTM
          </div>
        )}
      </div>
      <AddToCartPanel product={product} />
    </div>
  );
}
