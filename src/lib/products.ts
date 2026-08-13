import { api } from "@/lib/api";
import { Product } from "@/types";
import { mockProducts } from "@/lib/mockProducts";

export async function getProducts(params?: { category?: string }): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>("/products", { params });
    if (res.data?.length) return res.data;
    return mockProducts;
  } catch {
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await api.get<Product>(`/products/slug/${slug}`);
    if (res.data) return res.data;
  } catch {
    // fall through to mock
  }
  return mockProducts.find((p) => p.slug === slug) || null;
}
