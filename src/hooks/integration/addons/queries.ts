import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { ADDONS_KEYS } from "./keys";
import Addon from "@/@backend-types/Addon";
import AddonPrice from "@/@backend-types/AddonPrice";

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
