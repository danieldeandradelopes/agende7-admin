import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import { BARBER_CONFIGS_KEYS } from "./keys";
import { IAddWorkingHoursByBarber } from "@/types/WorkingHoursTypes";

interface DayConfig {
  weekDay: string;
  timeSlots: string[];
}
interface ConfigWorkingHoursBarberData {
  days: DayConfig[];
}

export const useConfigWorkingHoursBarberShop = () => {
  const { getToken } = useAuth();

  return useMutation<void, Error, ConfigWorkingHoursBarberData>({
    mutationFn: async (data) => {
      await api.post<void>({
        url: "/barber-shop/working-hours/admin",
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [BARBER_CONFIGS_KEYS.useConfigWorkingHoursBarberShop],
    onError: (err) => {
      console.error("Erro ao configurar horário de trabalho:", err);
      showNotification("Erro ao configurar horário de trabalho:");
    },
    onSuccess: () => {
      showNotification("Configurações salvas com sucesso");
    },
  });
};

export const useSetCustomWorkingHoursInADay = () => {
  const { getToken } = useAuth();

  return useMutation<void, Error, IAddWorkingHoursByBarber>({
    mutationFn: async (data) => {
      await api.post<void>({
        url: "/barber-shop/barber/custom-working-hours",
        data: {
          ...data,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [BARBER_CONFIGS_KEYS.useSetCustomWorkingHoursInADay],
    onError: (err) => {
      console.error("Erro ao configurar horário de trabalho:", err);
      showNotification("Erro ao configurar horário de trabalho:");
    },
    onSuccess: () => {
      showNotification("Configurações salvas com sucesso");
    },
  });
};
