import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { SUBSCRIPTIONS_KEYS } from "./keys";

// TODO DANIEL: Verificar o type
export interface Subscription {
  id?: number;
  barbershop_id: number;
  plan_price_id: number;
  status?: "active" | "past_due" | "canceled";
  start_date: string;
  end_date?: string;
  trial_end_date?: string;
  created_at?: string;
}

export const useGetSubscriptionByBarbershopId = (barbershopId: number) => {
  const { getToken } = useAuth();

  return useQuery<Subscription, Error, Subscription>({
    queryKey: [
      SUBSCRIPTIONS_KEYS.useGetSubscriptionByBarbershopId,
      barbershopId,
    ],
    queryFn: async () => {
      const response = await api.get<Subscription>({
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

  return useQuery<Subscription[], Error, Subscription[]>({
    queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscriptions, barbershopId],
    queryFn: async () => {
      const response = await api.get<Subscription[]>({
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

  return useQuery<Subscription, Error, Subscription>({
    queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscription, id],
    queryFn: async () => {
      const response = await api.get<Subscription>({
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
