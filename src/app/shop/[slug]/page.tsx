import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";
import AddToCartPanel from "@/components/AddToCartPanel";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: product.images?.length ? product.images : ["/logo.png"] },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

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
