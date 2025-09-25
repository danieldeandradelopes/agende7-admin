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

export interface DashboardReports {
  new_users: DashboardPeriodComparison;
  schedules: DashboardPeriodComparison;
}
