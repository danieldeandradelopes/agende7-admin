export interface WorkingHoursProps {
  id: number;
  barber_shop_id: number;
  week_day: string;
  time_slots: string[];
  is_open: boolean;
  created_at?: string;
  updated_at?: string;
}

export default class WorkingHours {
  readonly id: number;
  readonly barber_shop_id: number;
  readonly week_day: string;
  readonly time_slots: string[];
  readonly is_open: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor({
    id,
    barber_shop_id,
    week_day,
    time_slots,
    is_open,
    created_at,
    updated_at,
  }: WorkingHoursProps) {
    this.id = id;
    this.barber_shop_id = barber_shop_id;
    this.week_day = week_day;
    this.time_slots = time_slots;
    this.is_open = is_open;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
