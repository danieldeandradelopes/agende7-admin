import Barber from "@/@backend-types/Barber";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { formatToLocalDateTime } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { BARBER_KEYS } from "./keys";

export class AvailableHour {
  constructor(readonly time: string) {}
}

export const useGetBarbers = (date: Date) => {
  const { getToken } = useAuth();

  return useQuery<Barber[], Error, Barber[]>({
    queryKey: [BARBER_KEYS.barbers],
    queryFn: async () => {
      const response = await api.get<Barber[]>({
        url: `/barbers/${formatToLocalDateTime(date)}/list`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!date,
  });
};
