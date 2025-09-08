import { ScheduleWithDetails } from "./ScheduleWithDetails";

export interface ScheduleWithAggregates {
  schedules: ScheduleWithDetails[];
  total_services_value: number;
  total_services_count: number;
}
