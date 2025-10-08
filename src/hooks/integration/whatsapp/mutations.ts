import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import { WHATSAPP_KEYS } from "./keys";

export const useLoginWhatsapp = () => {
  const { getToken } = useAuth();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      return await api.get<void>({
        url: "/whatsapp-login",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [WHATSAPP_KEYS.useLoginWhatsapp],
    onError: (err) => {
      console.error("Erro ao fazer login no whatsapp:", err);
      showNotification("Erro ao fazer login no whatsapp:");
    },
  });
};
