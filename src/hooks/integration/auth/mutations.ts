import { defaultBarberShop, useAuth } from "@/hooks/utils/use-auth";
import { LoginType } from "@/pages/Login/schema";
import { ProfileUpdateType } from "@/pages/Profile/schema";
import { UserRegisterType } from "@/pages/UserRegister/schema";
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
        url: "/login",
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

export interface ProviderAuthData {
  email: string;
  phone: string;
  name: string;
  avatar: string;
  provider: string;
  providerUid: string;
  barberShopId?: number;
  token: string;
}

export const useProviderLogin = () => {
  const { login } = useAuth();

  return useMutation<Authentication, Error, ProviderAuthData>({
    mutationFn: async (value) => {
      const response = await api.post<Authentication>({
        url: "/provider/login",
        data: value,
        headers: {
          Authorization: `Bearer ${value.token}`,
        },
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

export const useRegister = () => {
  const { login } = useAuth();

  return useMutation<Authentication, Error, UserRegisterType>({
    mutationFn: async (value) => {
      const response = await api.post<Authentication>({
        url: "/users/customer",
        data: value,
      });

      login(
        response.token,
        response.user,
        response.barbershop ?? defaultBarberShop
      );

      return response;
    },
    mutationKey: [AUTH_KEYS.register],
    onError: (err) => {
      console.log(err);
      showNotification("Falha ao cadastrar usuário");
    },
    onSuccess: () => {
      showNotification("Usuário cadastrado com sucesso!");
    },
    retry: false,
  });
};

export const useUpdateProfile = () => {
  const { getUser, getToken, register } = useAuth();

  return useMutation<ProfileUpdateType, Error, ProfileUpdateType>({
    mutationFn: async (value) => {
      const response = await api.put<ProfileUpdateType>({
        url: `/users`,
        data: value,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      register({ ...getUser(), ...response });

      return response;
    },
    mutationKey: [AUTH_KEYS.useUpdateProfile],
    onError: (err) => {
      console.log(err);
      showNotification("Erro ao atualizar perfil!");
    },
    onSuccess: () => {
      showNotification("Perfil atualizado com sucesso!");
    },
    retry: false,
  });
};
