import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { ADDONS_KEYS } from "./keys";

// TODO DANIEL: Verificar types
export interface Addon {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AddonPrice {
  id?: number;
  addon_id: number;
  billing_cycle: "monthly" | "semiannual" | "yearly";
  price: number;
  created_at?: string;
}

export const useGetAddons = () => {
  const { getToken } = useAuth();

  return useQuery<Addon[], Error, Addon[]>({
    queryKey: [ADDONS_KEYS.useGetAddons],
    queryFn: async () => {
      const response = await api.get<Addon[]>({
        url: `/addons`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken(),
  });
};

export const useGetAddon = (id: number) => {
  const { getToken } = useAuth();

  return useQuery<Addon, Error, Addon>({
    queryKey: [ADDONS_KEYS.useGetAddon, id],
    queryFn: async () => {
      const response = await api.get<Addon>({
        url: `/addons/${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!id,
  });
};

export const useGetAddonPrices = () => {
  const { getToken } = useAuth();

  return useQuery<AddonPrice[], Error, AddonPrice[]>({
    queryKey: ["useGetAddonPrices"],
    queryFn: async () => {
      const response = await api.get<AddonPrice[]>({
        url: `/addon-prices`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken(),
  });
};
