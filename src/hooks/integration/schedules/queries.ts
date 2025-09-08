import Barber from "@/@backend-types/Barber";
import { ScheduleWithDetails } from "@/@backend-types/ScheduleWithDetails";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { SCHEDULES_KEYS } from "./keys";
import { formatToLocalDateTime } from "@/utils/date";
import { ScheduleWithAggregates } from "@/@backend-types/ScheduleWithAggregates";

export const useGetSchedulesByBarberId = (date: Date) => {
  const { getToken } = useAuth();

  return useQuery<ScheduleWithDetails[], Error, ScheduleWithDetails[]>({
    queryKey: [SCHEDULES_KEYS.schedulesByBarberId],
    queryFn: async () => {
      const response = await api.get<ScheduleWithDetails[]>({
        url: "/schedules",
        queryParams: {
          date: date.toISOString(),
          status: ["pending", "approved", "done"].join(","),
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!date,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

export const useGetReportsSchedulesByBarberId = (begin: Date, end: Date) => {
  const { getToken } = useAuth();

  return useQuery<ScheduleWithAggregates, Error, ScheduleWithAggregates>({
    queryKey: [SCHEDULES_KEYS.schedulesByBarberId],
    queryFn: async () => {
      const response = await api.get<ScheduleWithAggregates>({
        url: "/reports-schedules",
        queryParams: {
          begin: begin.toISOString(),
          end: end.toISOString(),
          status: ["pending", "approved", "done"].join(","),
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!begin && !!end,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

export const useGetSchedulesCustomer = () => {
  const { getToken } = useAuth();

  return useQuery<ScheduleWithDetails[], Error, ScheduleWithDetails[]>({
    queryKey: [SCHEDULES_KEYS.schedulesCustomer],
    queryFn: async () => {
      const response = await api.get<ScheduleWithDetails[]>({
        url: "/schedules/customer",
        queryParams: {
          status: ["pending", "approved"].join(","),
        },
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

export const useGetSchedulesCustomerHistory = () => {
  const { getToken } = useAuth();

  return useQuery<ScheduleWithDetails[], Error, ScheduleWithDetails[]>({
    queryKey: [SCHEDULES_KEYS.schedulesCustomerHistory],
    queryFn: async () => {
      const response = await api.get<ScheduleWithDetails[]>({
        url: "/schedules/customer",
        queryParams: {
          status: "done",
        },
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

export const useGetPendingRateList = () => {
  const { getToken } = useAuth();

  return useQuery<ScheduleWithDetails[], Error, ScheduleWithDetails[]>({
    queryKey: [SCHEDULES_KEYS.pendingRateList],
    queryFn: async () => {
      const response = await api.get<ScheduleWithDetails[]>({
        url: "/schedules/pending-rate/customer",
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

export const useGetAvailableSlots = (date: Date, serviceDuration: number) => {
  const { getToken } = useAuth();

  return useQuery<Barber[], Error, Barber[]>({
    queryKey: [SCHEDULES_KEYS.availableSlots],
    queryFn: async () => {
      const response = await api.get<Barber[]>({
        url: "/barbers/list/available",
        queryParams: {
          date: formatToLocalDateTime(date),
          serviceDuration: serviceDuration.toString(),
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!date && !!serviceDuration,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};
