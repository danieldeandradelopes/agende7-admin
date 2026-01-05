import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { SUBSCRIPTIONS_KEYS } from "./keys";
import { SubscriptionAdmin } from "@/@backend-types/SubscriptionAdmin";

export const useGetSubscriptionByBarbershopId = (barbershopId: number) => {
  const { getToken } = useAuth();

  return useQuery<SubscriptionAdmin, Error, SubscriptionAdmin>({
    queryKey: [
      SUBSCRIPTIONS_KEYS.useGetSubscriptionByBarbershopId,
      barbershopId,
    ],
    queryFn: async () => {
      const response = await api.get<SubscriptionAdmin>({
        url: `/subscription-validate`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!barbershopId,
  });
};

export const useGetSubscriptions = (barbershopId?: number) => {
  const { getToken } = useAuth();

  return useQuery<SubscriptionAdmin[], Error, SubscriptionAdmin[]>({
    queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscriptions, barbershopId],
    queryFn: async () => {
      const response = await api.get<SubscriptionAdmin[]>({
        url: `/subscriptions`,
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

export const useGetSubscription = (id: number) => {
  const { getToken } = useAuth();

  return useQuery<SubscriptionAdmin, Error, SubscriptionAdmin>({
    queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscription, id],
    queryFn: async () => {
      const response = await api.get<SubscriptionAdmin>({
        url: `/subscriptions/${id}`,
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
