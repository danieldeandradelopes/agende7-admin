import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import { PAYMENT_KEYS } from "./keys";
import { CreatePreferenceResponse } from "@/@backend-types/GatewayPayment";

export const useCreatePreference = () => {
  const { getToken } = useAuth();

  return useMutation<CreatePreferenceResponse, Error, { planId: number }>({
    mutationFn: async (data) => {
      return await api.post<CreatePreferenceResponse>({
        url: "/create_preference",
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [PAYMENT_KEYS.useCreatePreference],
    onError: (err) => {
      console.error("Erro ao criar preferência:", err);
      showNotification("Erro ao criar preferência:");
    },
  });
};
