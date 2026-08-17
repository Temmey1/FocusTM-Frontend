import { api } from "@/lib/api";
import { DeliveryLocation } from "@/types";
import { nigeriaStates } from "@/lib/nigeriaStates";

const FALLBACK_FEE = 2500;

// Fallback delivery locations used when the backend hasn't been configured
// with any yet, so checkout still works out of the box.
const fallbackLocations: DeliveryLocation[] = nigeriaStates.map((state, i) => ({
  id: `fallback-${i}`, type: "delivery", state, fee: FALLBACK_FEE, active: true,
}));

export async function getDeliveryLocations(): Promise<DeliveryLocation[]> {
  try {
    const res = await api.get<DeliveryLocation[]>("/locations", { params: { type: "delivery" } });
    return res.data?.length ? res.data : fallbackLocations;
  } catch {
    return fallbackLocations;
  }
}

export async function getPickupLocations(): Promise<DeliveryLocation[]> {
  try {
    const res = await api.get<DeliveryLocation[]>("/locations", { params: { type: "pickup" } });
    return res.data || [];
  } catch {
    return [];
  }
}
