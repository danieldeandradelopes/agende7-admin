import Schedule from "./Schedule";
import { StatusType } from "./StatusType";

export interface ScheduleWithDetails extends Schedule {
  service_name: string;
  price: number;
  barber_name: string;
  barber_photo: string;
  status: StatusType;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_photo: string;
  service_duration: number;
  service_description: string;
  service_price: number;
  service_end_time: string;
  service_start_time: string;
  week_day: string;
  rate: number | null;
  created_at: Date;
  updated_at: Date;
}
