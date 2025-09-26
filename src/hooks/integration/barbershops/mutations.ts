import BarberShop, {
  BarberShopWithDefaultTemplate,
} from "@/@backend-types/BarberShop";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BARBERSHOPS_KEYS } from "./keys";

export const useCreateBarberShop = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, BarberShopWithDefaultTemplate>({
    mutationFn: async (data) => {
      await api.post<void>({
        url: "/barber-shop/default-template",
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [BARBERSHOPS_KEYS.useCreateBarberShop],
    onError: (err) => {
      console.error("Erro ao criar barbearia:", err);
      showNotification("Erro ao criar barbearia:");
    },
    onSuccess: () => {
      showNotification("Barbearia criada com sucesso");
      queryClient.invalidateQueries({
        queryKey: [BARBERSHOPS_KEYS.useGetBarbershops],
      });
    },
  });
};

export const useDeleteBarberShop = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await api.delete<void>({
        url: `/barber-shop/${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [BARBERSHOPS_KEYS.useDeleteBarberShop],
    onError: (err) => {
      console.error("Erro ao deletar barbearia:", err);
      showNotification("Erro ao deletar barbearia:");
    },
    onSuccess: () => {
      showNotification("Barbearia deletada com sucesso");
      queryClient.invalidateQueries({
        queryKey: [BARBERSHOPS_KEYS.useGetBarbershops],
      });
    },
  });
};

export const useUpdateBarberShop = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    BarberShop,
    Error,
    { id: number; data: Partial<BarberShop> }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await api.put<BarberShop>({
        url: `/barber-shop/${id}`,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [BARBERSHOPS_KEYS.useUpdateBarberShop],
    onError: (err) => {
      console.error("Erro ao atualizar barbearia:", err);
      showNotification("Erro ao atualizar barbearia");
    },
    onSuccess: () => {
      showNotification("Barbearia atualizada com sucesso");
      queryClient.invalidateQueries({
        queryKey: [BARBERSHOPS_KEYS.useGetBarbershops],
      });
      queryClient.invalidateQueries({
        queryKey: [BARBERSHOPS_KEYS.useGetBarbershopById],
      });
    },
  });
};
