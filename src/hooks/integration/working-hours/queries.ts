import WorkingHours from "@/@backend-types/WorkingHours";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { WORKING_HOURS_KEYS } from "./keys";

export const useGetWorkingHours = (barbershopId?: number) => {
  const { getToken } = useAuth();

  return useQuery<WorkingHours[], Error, WorkingHours[]>({
    queryKey: [WORKING_HOURS_KEYS.useGetWorkingHours, barbershopId],
    queryFn: async () => {
      const response = await api.get<WorkingHours[]>({
        url: `/barber-shop/working-hours/admin`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken(),
  });
};
