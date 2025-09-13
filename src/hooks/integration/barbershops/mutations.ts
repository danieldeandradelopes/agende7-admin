import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { BARBERSHOPS_KEYS } from "./keys";
import showNotification from "@/utils/notify";
import BarberShop from "@/@backend-types/BarberShop";

export const useCreateBarberShop = () => {
  const { getToken } = useAuth();

  return useMutation<void, Error, BarberShop>({
    mutationFn: async (data) => {
      await api.post<void>({
        url: "/barber-shop",
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
    },
  });
};
