import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { SERVICES_KEYS } from "./keys";

export default class Service {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly price: number,
    readonly duration: number,
    readonly updated_at?: string,
    readonly created_at?: string
  ) {}
}

export const useGetServices = (barberShopId: number) => {
  const { getToken } = useAuth();

  return useQuery<Service[], Error, Service[]>({
    queryKey: [SERVICES_KEYS.services],
    queryFn: async () => {
      const response = await api.get<Service[]>({
        url: `/services/admin/${barberShopId}`,
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
