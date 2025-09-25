import { DashboardReports } from "@/@backend-types/Reports";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { REPORTS_KEYS } from "./keys";

export const useGetReportsDashboard = () => {
  const { getToken } = useAuth();

  return useQuery<DashboardReports, Error, DashboardReports>({
    queryKey: [REPORTS_KEYS.useGetReportsDashboard],
    queryFn: async () => {
      const response = await api.get<DashboardReports>({
        url: "/dashboard-reports",
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
