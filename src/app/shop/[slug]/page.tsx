import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "@/lib/products";
import AddToCartPanel from "@/components/AddToCartPanel";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
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
