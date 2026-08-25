import { api } from "@/lib/api";
import { Product } from "@/types";

function normalize<T extends { _id?: any; id?: string }>(doc: T): T & { id: string } {
  const anyDoc = doc as any;
  return { ...doc, id: anyDoc?.id ?? anyDoc?._id?.toString() ?? String(Math.random()) } as any;
}

// Server-side fetch without authentication (for server components)
async function fetchProducts(params?: { category?: string }): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const url = new URL("/products", baseUrl);
  if (params?.category) url.searchParams.append("category", params.category);

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (Array.isArray(data)) {
    return data.map((p: any) => normalize(p));
  }
  if (Array.isArray(data.data)) {
    return data.data.map((p: any) => normalize(p));
  }
  return [];
}

// Client-side fetch with authentication (for client components)
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

// Server-side version for server components
export async function getProductsServer(params?: { category?: string }): Promise<Product[]> {
  return fetchProducts(params);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await api.get<Product>(`/products/slug/${slug}`);
  if (res?.data) return normalize(res.data as any);
  return null;
}
