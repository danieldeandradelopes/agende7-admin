import Branding from "@/@backend-types/Branding";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BRANDING_KEYS } from "./keys";

export const useCreateBranding = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    Branding,
    Error,
    { barbershopId: number; data: Partial<Branding> }
  >({
    mutationFn: async ({ barbershopId, data }) => {
      const response = await api.post<Branding>({
        url: `/branding/admin/${barbershopId}`,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [BRANDING_KEYS.createBranding],
    onError: (err) => {
      console.error("Erro ao criar branding:", err);
      showNotification("Erro ao criar branding");
    },
    onSuccess: () => {
      showNotification("Branding criado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [BRANDING_KEYS.brandingById],
      });
      queryClient.invalidateQueries({
        queryKey: [BRANDING_KEYS.branding],
      });
    },
  });
};

export const useUpdateBranding = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    Branding,
    Error,
    { barbershopId: number; data: Partial<Branding> }
  >({
    mutationFn: async ({ barbershopId, data }) => {
      const response = await api.put<Branding>({
        url: `/branding/admin/${barbershopId}`,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [BRANDING_KEYS.updateBranding],
    onError: (err) => {
      console.error("Erro ao atualizar branding:", err);
      showNotification("Erro ao atualizar branding");
    },
    onSuccess: () => {
      showNotification("Branding atualizado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [BRANDING_KEYS.brandingById],
      });
      queryClient.invalidateQueries({
        queryKey: [BRANDING_KEYS.branding],
      });
    },
  });
};
