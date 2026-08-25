import { api } from "@/lib/api";
import { Product } from "@/types";

function normalize<T extends { _id?: any; id?: string }>(doc: T): T & { id: string } {
  const anyDoc = doc as any;
  return { ...doc, id: anyDoc?.id ?? anyDoc?._id?.toString() ?? String(Math.random()) } as any;
}

export async function getProducts(params?: { category?: string }): Promise<Product[]> {
  const res = await api.get<any>("/products", { params });
  if (res && res.data) {
    if (Array.isArray(res.data)) {
      return res.data.map((p: any) => normalize(p));
    }
    if (Array.isArray(res.data.data)) {
      return res.data.data.map((p: any) => normalize(p));
    }
  }
  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await api.get<Product>(`/products/slug/${slug}`);
  if (res?.data) return normalize(res.data as any);
  return null;
}
