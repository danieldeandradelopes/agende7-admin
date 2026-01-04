export interface BarberUnavailablePeriodProps {
  id: number;
  barber_shop_id: number;
  barber_id: number;
  start_date: string | Date;
  end_date: string | Date;
  reason?: string;
  created_at?: string;
  updated_at?: string;
}

export default class BarberUnavailablePeriod {
  readonly id: number;
  readonly barber_shop_id: number;
  readonly barber_id: number;
  readonly start_date: string | Date;
  readonly end_date: string | Date;
  readonly reason?: string;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor({
    id,
    barber_shop_id,
    barber_id,
    start_date,
    end_date,
    reason,
    created_at,
    updated_at,
  }: BarberUnavailablePeriodProps) {
    this.id = id;
    this.barber_shop_id = barber_shop_id;
    this.barber_id = barber_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.reason = reason;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
