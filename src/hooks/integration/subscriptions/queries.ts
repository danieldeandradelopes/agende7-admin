import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { SUBSCRIPTIONS_KEYS } from "./keys";
import { SubscriptionAdmin } from "@/@backend-types/SubscriptionAdmin";
import { SubscriptionValidateResponse } from "@/@backend-types/Subscription";

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

  return useQuery<
    SubscriptionValidateResponse,
    Error,
    SubscriptionValidateResponse
  >({
    queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscriptions, barbershopId],
    queryFn: async () => {
      const response = await api.get<SubscriptionValidateResponse>({
        url: `/subscriptions/${barbershopId}`,
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
