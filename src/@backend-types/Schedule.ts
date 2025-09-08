import { StatusType } from "./StatusType";

interface ScheduleProps {
  id: number;
  barber_shop_id: number;
  customer_id: number;
  service_id: number;
  barber_id: number;
  status: StatusType;
  rate: number;
  reason_customer?: string;
  reason_barber?: string;
  start_date: Date;
  customer_name?: string;
  customer_phone?: string;
  auto_approve?: boolean;
  end_date: Date;
  deleted_at?: Date;
  updated_at?: Date;
  created_at?: Date;
}

export default class Schedule {
  readonly id?: number;
  readonly barber_shop_id: number;
  readonly customer_id: number;
  readonly service_id: number;
  readonly barber_id: number;
  readonly status: StatusType;
  readonly rate: number | null;
  readonly reason_customer?: string;
  readonly reason_barber?: string;
  readonly start_date: Date;
  readonly customer_name?: string;
  readonly customer_phone?: string;
  readonly auto_approve?: boolean;
  readonly end_date: Date;
  readonly deleted_at?: Date;
  readonly updated_at?: Date;
  readonly created_at?: Date;

  constructor({
    id,
    barber_shop_id,
    customer_id,
    service_id,
    barber_id,
    status,
    rate,
    reason_customer,
    reason_barber,
    start_date,
    end_date,
    customer_name,
    customer_phone,
    auto_approve,
    deleted_at,
    updated_at,
    created_at,
  }: ScheduleProps) {
    this.id = id;
    this.barber_shop_id = barber_shop_id;
    this.customer_id = customer_id;
    this.service_id = service_id;
    this.barber_id = barber_id;
    this.status = status;
    this.rate = rate;
    this.reason_customer = reason_customer;
    this.reason_barber = reason_barber;
    this.start_date = start_date;
    this.end_date = end_date;
    this.customer_name = customer_name;
    this.customer_phone = customer_phone;
    this.auto_approve = auto_approve;
    this.deleted_at = deleted_at;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
