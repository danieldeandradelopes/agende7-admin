import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVICES_KEYS } from "./keys";

interface CreateServiceData {
  title: string;
  description: string;
  price: number;
  duration: number;
}

export const useCreateService = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateServiceData>({
    mutationFn: async (data) => {
      await api.post<void>({
        url: `/services`,
        data: {
          ...data,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SERVICES_KEYS.useCreateService],
    onError: (err) => {
      console.error("Erro ao criar serviço:", err);
      showNotification("Erro ao criar serviço");
    },
    onSuccess: () => {
      showNotification("Serviço criado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [SERVICES_KEYS.services],
      });
    },
  });
};

export const useDeleteService = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (serviceId) => {
      await api.delete<void>({
        url: `/services/${serviceId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SERVICES_KEYS.useDeleteService],
    onError: (err) => {
      console.error("Erro ao deletar serviço:", err);
      showNotification("Erro ao deletar serviço");
    },
    onSuccess: () => {
      showNotification("Serviço deletado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [SERVICES_KEYS.services],
      });
    },
  });
};
