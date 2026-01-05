import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SUBSCRIPTION_ADDONS_KEYS } from "./keys";
import { SubscriptionAddon } from "./queries";

export interface CreateSubscriptionAddonData {
  subscription_id: number;
  addon_id: number;
  addon_price_id: number;
  status?: "active" | "past_due" | "canceled";
  start_date: string;
  end_date?: string;
}

export const useCreateSubscriptionAddon = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<SubscriptionAddon, Error, CreateSubscriptionAddonData>({
    mutationFn: async (data) => {
      const response = await api.post<SubscriptionAddon>({
        url: "/subscription-addon",
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [SUBSCRIPTION_ADDONS_KEYS.useCreateSubscriptionAddon],
    onError: (err) => {
      console.error("Erro ao criar subscription addon:", err);
      showNotification("Erro ao criar subscription addon");
    },
    onSuccess: (_, variables) => {
      showNotification("Subscription addon criado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [
          SUBSCRIPTION_ADDONS_KEYS.useGetSubscriptionAddonsBySubscriptionId,
          variables.subscription_id,
        ],
      });
    },
  });
};

export const useUpdateSubscriptionAddon = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    SubscriptionAddon,
    Error,
    { id: number; data: Partial<SubscriptionAddon> }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await api.put<SubscriptionAddon>({
        url: `/subscription-addon/${id}`,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [SUBSCRIPTION_ADDONS_KEYS.useUpdateSubscriptionAddon],
    onError: (err) => {
      console.error("Erro ao atualizar subscription addon:", err);
      showNotification("Erro ao atualizar subscription addon");
    },
    onSuccess: (_, variables) => {
      showNotification("Subscription addon atualizado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [
          SUBSCRIPTION_ADDONS_KEYS.useGetSubscriptionAddonsBySubscriptionId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          SUBSCRIPTION_ADDONS_KEYS.useGetSubscriptionAddon,
          variables.id,
        ],
      });
    },
  });
};

export const useDeleteSubscriptionAddon = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number; subscriptionId: number }>({
    mutationFn: async ({ id }) => {
      await api.delete<void>({
        url: `/subscription-addon/${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SUBSCRIPTION_ADDONS_KEYS.useDeleteSubscriptionAddon],
    onError: (err) => {
      console.error("Erro ao deletar subscription addon:", err);
      showNotification("Erro ao deletar subscription addon");
    },
    onSuccess: (_, variables) => {
      showNotification("Subscription addon deletado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [
          SUBSCRIPTION_ADDONS_KEYS.useGetSubscriptionAddonsBySubscriptionId,
          variables.subscriptionId,
        ],
      });
    },
  });
};
