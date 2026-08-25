import { api } from "@/lib/api";
import { Product } from "@/types";
import { mockProducts } from "@/lib/mockProducts";

function normalize<T extends { _id?: any; id?: string }>(doc: T): T & { id: string } {
  const anyDoc = doc as any;
  return { ...doc, id: anyDoc?.id ?? anyDoc?._id?.toString() ?? String(Math.random()) } as any;
}

export async function getProducts(params?: { category?: string }): Promise<Product[]> {
  try {
    const res = await api.get<any>("/products", { params });
    if (res && res.data) {
      if (Array.isArray(res.data)) {
        return res.data.map((p: any) => normalize(p));
      }
      if (Array.isArray(res.data.data)) {
        return res.data.data.map((p: any) => normalize(p));
      }
    }
  } catch {
    // fall through to mock fallback if network error
  }
  // Only fall back to mock products when the API is genuinely unreachable,
  // not when the DB is simply empty for the given filter.
  return params?.category
    ? []
    : mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await api.get<Product>(`/products/slug/${slug}`);
    if (res?.data) return normalize(res.data as any);
  } catch {
    // fall through to mock
  }
  return mockProducts.find((p) => p.slug === slug) || null;
}
