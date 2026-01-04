import Manifest from "@/@backend-types/Manifest";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANIFEST_KEYS } from "./keys";

export const useUpdateManifest = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    Manifest,
    Error,
    { barbershopId: number; data: Partial<Manifest> }
  >({
    mutationFn: async ({ barbershopId, data }) => {
      const response = await api.put<Manifest>({
        url: `/manifest/${barbershopId}`,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [MANIFEST_KEYS.useUpdateManifest],
    onError: (err) => {
      console.error("Erro ao atualizar manifest:", err);
      showNotification("Erro ao atualizar manifest");
    },
    onSuccess: () => {
      showNotification("Manifest atualizado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [MANIFEST_KEYS.useGetManifest],
      });
    },
  });
};
