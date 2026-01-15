export interface DashboardPeriodCount {
  today: number;
  this_month: number;
  this_year: number;
}

export interface DashboardPeriodComparison {
  today: number;
  this_month: number;
  this_year: number;
  yesterday: number;
  last_month: number;
  last_year: number;
  today_vs_yesterday: {
    value: number;
    trend: "up" | "down" | "same";
  };
  this_month_vs_last_month: {
    value: number;
    trend: "up" | "down" | "same";
  };
  this_year_vs_last_year: {
    value: number;
    trend: "up" | "down" | "same";
  };
}

export interface RevenueMetrics {
  mrr: number; // Monthly Recurring Revenue em centavos
  total_revenue_month: number; // Receita total do mês em centavos
  total_revenue_year: number; // Receita total do ano em centavos
}

export interface SubscriptionMetrics {
  active: number;
  past_due: number;
  canceled: number;
  conversion_rate: number; // Taxa de conversão (usuários -> assinantes) em porcentagem
}

export interface BarbershopMetrics {
  total: number;
  active: number; // Com assinatura ativa
  inactive: number;
}

export interface ScheduleStatusMetrics {
  pending: number;
  approved: number;
  done: number;
  canceled: number;
}

export interface TimeSeriesDataPoint {
  date: string; // YYYY-MM-DD
  value: number;
}

export interface TimeSeriesData {
  users_last_30_days: TimeSeriesDataPoint[];
  schedules_last_30_days: TimeSeriesDataPoint[];
  revenue_last_30_days: TimeSeriesDataPoint[];
  mrr_last_12_months: TimeSeriesDataPoint[];
  users_last_12_months: TimeSeriesDataPoint[];
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  barbershopId?: number;
  scheduleStatus?: string[];
}

export interface DashboardReports {
  new_users: DashboardPeriodComparison;
  schedules: DashboardPeriodComparison;
  revenue: RevenueMetrics;
  subscriptions: SubscriptionMetrics;
  barbershops: BarbershopMetrics;
  schedule_status: ScheduleStatusMetrics;
  time_series: TimeSeriesData;
}
