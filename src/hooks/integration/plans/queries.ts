import Plan from "@/@backend-types/Plan";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { PLANS_KEYS } from "./keys";

export class AvailableHour {
  constructor(readonly time: string) {}
}

export const useGetPlans = () => {
  const { getToken } = useAuth();

  return useQuery<Plan[], Error, Plan[]>({
    queryKey: [PLANS_KEYS.useGetPlans],
    queryFn: async () => {
      const response = await api.get<Plan[]>({
        url: `/plans`,
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
