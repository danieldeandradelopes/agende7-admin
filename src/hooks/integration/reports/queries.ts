import { DashboardFilters, DashboardReports } from "@/@backend-types/Reports";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { REPORTS_KEYS } from "./keys";

export const useGetReportsDashboard = (filters?: DashboardFilters) => {
  const { getToken } = useAuth();

  // Construir query string
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filters?.startDate) {
      params.append("startDate", filters.startDate);
    }
    if (filters?.endDate) {
      params.append("endDate", filters.endDate);
    }
    if (filters?.barbershopId) {
      params.append("barbershopId", filters.barbershopId.toString());
    }
    if (filters?.scheduleStatus) {
      params.append("scheduleStatus", filters.scheduleStatus.join(","));
    }
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  return useQuery<DashboardReports, Error, DashboardReports>({
    queryKey: [REPORTS_KEYS.useGetReportsDashboard, filters],
    queryFn: async () => {
      const response = await api.get<DashboardReports>({
        url: `/dashboard-reports${buildQueryString()}`,
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
