import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BARBER_CONFIGS_KEYS } from "./keys";
import WorkingHours from "@/@backend-types/WorkingHours";

export const useGetWorkingHours = () => {
  const { getToken } = useAuth();

  return useQuery<WorkingHours[], Error, WorkingHours[]>({
    queryKey: [BARBER_CONFIGS_KEYS.useGetWorkingHours],
    queryFn: async () => {
      const response = await api.get<WorkingHours[]>({
        url: "/barber-shop/working-hours/admin",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

export const useGetCustomWorkingHoursInADay = (date: Date) => {
  const { getToken, getUser } = useAuth();

  const barberId = getUser()?.id;

  return useQuery<WorkingHours, Error, WorkingHours>({
    queryKey: [BARBER_CONFIGS_KEYS.useGetCustomWorkingHoursInADay, date],
    queryFn: async () => {
      const response = await api.get<WorkingHours>({
        url: `/barber-shop/barber/custom-working-hours/${date.toISOString()}/${barberId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!barberId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};
