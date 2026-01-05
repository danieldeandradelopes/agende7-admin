import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { SUBSCRIPTION_ADDONS_KEYS } from "./keys";

export interface SubscriptionAddon {
  id?: number;
  subscription_id: number;
  addon_id: number;
  addon_price_id: number;
  status?: "active" | "past_due" | "canceled";
  start_date: string;
  end_date?: string;
  created_at?: string;
}

export const useGetSubscriptionAddonsBySubscriptionId = (
  subscriptionId: number
) => {
  const { getToken } = useAuth();

  return useQuery<SubscriptionAddon[], Error, SubscriptionAddon[]>({
    queryKey: [
      SUBSCRIPTION_ADDONS_KEYS.useGetSubscriptionAddonsBySubscriptionId,
      subscriptionId,
    ],
    queryFn: async () => {
      const response = await api.get<SubscriptionAddon[]>({
        url: `/subscription-addon/subscription/${subscriptionId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!subscriptionId,
  });
};

export const useGetSubscriptionAddon = (id: number) => {
  const { getToken } = useAuth();

  return useQuery<SubscriptionAddon, Error, SubscriptionAddon>({
    queryKey: [SUBSCRIPTION_ADDONS_KEYS.useGetSubscriptionAddon, id],
    queryFn: async () => {
      const response = await api.get<SubscriptionAddon>({
        url: `/subscription-addon/${id}`,
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
