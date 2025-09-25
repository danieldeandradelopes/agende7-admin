import { defaultBarberShop, useAuth } from "@/hooks/utils/use-auth";
import { LoginType } from "@/pages/Login/schema";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import { AUTH_KEYS } from "./keys";
import Authentication from "@/@backend-types/Authentication";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation<Authentication, Error, LoginType>({
    mutationFn: async (value) => {
      const response = await api.post<Authentication>({
        url: "/login/superadmin",
        data: value,
      });
      login(
        response.token,
        response.user,
        response.barbershop ?? defaultBarberShop
      );

      return response;
    },
    mutationKey: [AUTH_KEYS.login],
    onError: (err) => {
      console.log(err);
      showNotification("Erro ao fazer login");
    },
    retry: false,
  });
};
