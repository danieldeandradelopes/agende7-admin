import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SUBSCRIPTIONS_KEYS } from "./keys";
import { Subscription } from "./queries";

export interface CreateSubscriptionData {
  barbershop_id: number;
  plan_price_id: number;
  start_date: string;
  status?: "active" | "past_due" | "canceled";
  end_date?: string;
  trial_end_date?: string;
}

export const useCreateSubscription = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<Subscription, Error, CreateSubscriptionData>({
    mutationFn: async (data) => {
      const response = await api.post<Subscription>({
        url: "/subscriptions",
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [SUBSCRIPTIONS_KEYS.useCreateSubscription],
    onError: (err) => {
      console.error("Erro ao criar subscription:", err);
      showNotification("Erro ao criar subscription");
    },
    onSuccess: () => {
      showNotification("Subscription criada com sucesso");
      queryClient.invalidateQueries({
        queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscriptions],
      });
    },
  });
};

export const useUpdateSubscription = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    Subscription,
    Error,
    { id: number; data: Partial<Subscription> }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await api.put<Subscription>({
        url: `/subscriptions/${id}`,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [SUBSCRIPTIONS_KEYS.useUpdateSubscription],
    onError: (err) => {
      console.error("Erro ao atualizar subscription:", err);
      showNotification("Erro ao atualizar subscription");
    },
    onSuccess: () => {
      showNotification("Subscription atualizada com sucesso");
      queryClient.invalidateQueries({
        queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscriptions],
      });
      queryClient.invalidateQueries({
        queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscription],
      });
    },
  });
};

export const useDeleteSubscription = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await api.delete<void>({
        url: `/subscriptions/${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SUBSCRIPTIONS_KEYS.useDeleteSubscription],
    onError: (err) => {
      console.error("Erro ao deletar subscription:", err);
      showNotification("Erro ao deletar subscription");
    },
    onSuccess: () => {
      showNotification("Subscription deletada com sucesso");
      queryClient.invalidateQueries({
        queryKey: [SUBSCRIPTIONS_KEYS.useGetSubscriptions],
      });
    },
  });
};
