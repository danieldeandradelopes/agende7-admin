import constate from "constate";
import { useCustomLocalStorage } from "@/hooks/utils/use-custom-local-storage";
import { DashboardFilters } from "@/@backend-types/Reports";

export interface UseDashboardFilters {
  periodType:
    | "custom"
    | "7days"
    | "30days"
    | "3months"
    | "6months"
    | "1year"
    | "all";
  startDate?: string;
  endDate?: string;
  barbershopId?: number;
  scheduleStatus?: string[];
}

const DEFAULT_FILTERS: UseDashboardFilters = {
  periodType: "30days",
  scheduleStatus: [],
};

const STORAGE_KEY = "dashboard_filters";

function useDashboardFilters() {
  const [filters, setFilters, removeFilters] =
    useCustomLocalStorage<UseDashboardFilters>(STORAGE_KEY, DEFAULT_FILTERS);

  const updateFilters = (newFilters: Partial<UseDashboardFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const resetFilters = () => {
    removeFilters();
  };

  const getApiFilters = (): DashboardFilters => {
    const apiFilters: DashboardFilters = {};

    // Calcular datas baseado no periodType
    if (
      filters.periodType === "custom" &&
      filters.startDate &&
      filters.endDate
    ) {
      apiFilters.startDate = filters.startDate;
      apiFilters.endDate = filters.endDate;
    } else if (filters.periodType !== "all") {
      const endDate = new Date();
      const startDate = new Date();

      switch (filters.periodType) {
        case "7days":
          startDate.setDate(endDate.getDate() - 7);
          break;
        case "30days":
          startDate.setDate(endDate.getDate() - 30);
          break;
        case "3months":
          startDate.setMonth(endDate.getMonth() - 3);
          break;
        case "6months":
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        case "1year":
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
      }

      apiFilters.startDate = startDate.toISOString().split("T")[0];
      apiFilters.endDate = endDate.toISOString().split("T")[0];
    }

    if (filters.barbershopId) {
      apiFilters.barbershopId = filters.barbershopId;
    }

    if (filters.scheduleStatus && filters.scheduleStatus.length > 0) {
      apiFilters.scheduleStatus = filters.scheduleStatus;
    }

    return apiFilters;
  };

  return {
    filters,
    updateFilters,
    resetFilters,
    getApiFilters,
  };
}

export const [DashboardFiltersProvider, useDashboardFiltersContext] =
  constate(useDashboardFilters);
