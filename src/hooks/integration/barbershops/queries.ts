import BarberShop from "@/@backend-types/BarberShop";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BARBERSHOPS_KEYS } from "./keys";

export class AvailableHour {
  constructor(readonly time: string) {}
}

export const useGetBarbershops = () => {
  const { getToken } = useAuth();

  return useQuery<BarberShop[], Error, BarberShop[]>({
    queryKey: [BARBERSHOPS_KEYS.useGetBarbershops],
    queryFn: async () => {
      const response = await api.get<BarberShop[]>({
        url: `/barber-shop`,
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
