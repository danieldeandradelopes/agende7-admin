import {
  StoreScheduleByBarberShopRequest,
  StoreScheduleRequest,
} from "@/@backend-types/schedules.dtos";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SCHEDULES_KEYS } from "./keys";
import { StatusType } from "@/@backend-types/StatusType";

export const useCreateSchedule = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, StoreScheduleRequest>({
    mutationFn: async (data) => {
      const { start_date, barber_id, service_ids } = data;

      await api.post<void>({
        url: "/schedules",
        data: {
          start_date,
          barber_id,
          service_ids,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SCHEDULES_KEYS.createSchedule],
    onError: (err) => console.error("Erro ao criar agendamento:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesCustomer],
      });

      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesByBarberId],
      });
    },
  });
};

export const useCreateScheduleByBarberShop = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, StoreScheduleByBarberShopRequest>({
    mutationFn: async (data) => {
      const {
        start_date,
        barber_id,
        service_ids,
        customer_name,
        customer_phone,
      } = data;

      await api.post<void>({
        url: "/schedules/by-barber-shop",
        data: {
          start_date,
          barber_id,
          service_ids,
          customer_name,
          customer_phone,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SCHEDULES_KEYS.createScheduleByBarberShop],
    onError: (err) => console.error("Erro ao criar agendamento:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesCustomer],
      });

      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesByBarberId],
      });
    },
  });
};

export const useCancelSchedule = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { scheduleId: number; reason: string }>({
    mutationFn: async ({ scheduleId, reason }) => {
      await api.put<void>({
        url: `/schedules/${scheduleId}`,
        data: { reason },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SCHEDULES_KEYS.cancelSchedule],
    onError: (err) => console.error("Erro ao cancelar agendamento:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesCustomer],
      });

      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesByBarberId],
      });
    },
  });
};

export const useCancelBarberSchedule = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { scheduleId: number; reason: string }>({
    mutationFn: async ({ scheduleId, reason }) => {
      await api.put<void>({
        url: `/schedules/${scheduleId}/barber`,
        data: { reason },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SCHEDULES_KEYS.cancelBarberSchedule],
    onError: (err) => console.error("Erro ao cancelar agendamento:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesByBarberId],
      });
      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesCustomer],
      });
    },
  });
};

export const useConfirmBarberSchedule = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { scheduleId: number; status: StatusType }>({
    mutationFn: async ({ scheduleId, status }) => {
      await api.put<void>({
        url: `/schedules/${scheduleId}`,
        data: { status },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SCHEDULES_KEYS.confirmSchedule],
    onError: (err) => console.error("Erro ao confirmar agendamento:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.schedulesByBarberId],
      });
    },
  });
};

export const useRateSchedule = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { schedule_id: number; rate: number }>({
    mutationFn: async ({ schedule_id, rate }) => {
      await api.put<void>({
        url: `/schedules/${schedule_id}/rate`,
        data: { rate },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [SCHEDULES_KEYS.rateSchedule],
    onError: (err) => console.error("Erro ao avaliar agendamento:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SCHEDULES_KEYS.pendingRateList],
      });
    },
  });
};
