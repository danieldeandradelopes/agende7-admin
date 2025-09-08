export interface StoreScheduleRequest {
  start_date: string;
  barber_shop_id?: number;
  customer_id?: number;
  barber_id: number;
  service_ids: number[];
}

export interface StoreScheduleByBarberShopRequest {
  start_date: string;
  customer_id?: number;
  barber_shop_id?: number;
  barber_id: number;
  service_ids: number[];
  customer_name: string;
  customer_phone: string;
}
