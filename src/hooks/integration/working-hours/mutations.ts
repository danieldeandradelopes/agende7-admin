import WorkingHours from "@/@backend-types/WorkingHours";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WORKING_HOURS_KEYS } from "./keys";

export interface CreateWorkingHoursData {
  days: Array<{
    week_day: string;
    time_slots: string[];
    is_open: boolean;
  }>;
}

export interface UpdateWorkingHoursData {
  week_day: string;
  time_slots: string[];
  is_open: boolean;
}

export const useCreateWorkingHours = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<WorkingHours[], Error, CreateWorkingHoursData>({
    mutationFn: async (data) => {
      const response = await api.post<WorkingHours[]>({
        url: "/barber-shop/working-hours/admin",
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [WORKING_HOURS_KEYS.useCreateWorkingHours],
    onError: (err) => {
      console.error("Erro ao criar horários:", err);
      showNotification("Erro ao criar horários");
    },
    onSuccess: () => {
      showNotification("Horários criados com sucesso");
      queryClient.invalidateQueries({
        queryKey: [WORKING_HOURS_KEYS.useGetWorkingHours],
      });
    },
  });
};

export const useUpdateWorkingHours = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    WorkingHours,
    Error,
    { id: number; data: UpdateWorkingHoursData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await api.put<WorkingHours>({
        url: `/barber-shop/working-hours/${id}`,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    mutationKey: [WORKING_HOURS_KEYS.useUpdateWorkingHours],
    onError: (err) => {
      console.error("Erro ao atualizar horários:", err);
      showNotification("Erro ao atualizar horários");
    },
    onSuccess: () => {
      showNotification("Horários atualizados com sucesso");
      queryClient.invalidateQueries({
        queryKey: [WORKING_HOURS_KEYS.useGetWorkingHours],
      });
    },
  });
};

export const useDeleteWorkingHours = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await api.delete<void>({
        url: `/barber-shop/working-hours/${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [WORKING_HOURS_KEYS.useDeleteWorkingHours],
    onError: (err) => {
      console.error("Erro ao deletar horários:", err);
      showNotification("Erro ao deletar horários");
    },
    onSuccess: () => {
      showNotification("Horários deletados com sucesso");
      queryClient.invalidateQueries({
        queryKey: [WORKING_HOURS_KEYS.useGetWorkingHours],
      });
    },
  });
};
