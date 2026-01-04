export interface ProductInCommission {
  product_id: number;
  product_title: string;
  quantity: number;
  unit_price: number;
  item_value: number;
}

export interface CommissionItem {
  order_id?: number;
  schedule_id?: number;
  type: "physical" | "services";
  description: string;
  value: number;
  commission_percentage: number;
  commission_value: number;
  date: string;
  products?: ProductInCommission[];
}

export interface BarberCommissionReport {
  barber_id: number;
  barber_name: string;
  physical_comission: number;
  services_comission: number;
  digital_comission: number;
  items: CommissionItem[];
  total_physical_value: number;
  total_services_value: number;
  total_physical_commission: number;
  total_services_commission: number;
  total_commission: number;
}

export interface CommissionReport {
  barber_shop_id: number;
  begin_date: string;
  end_date: string;
  barbers: BarberCommissionReport[];
  total_physical_value: number;
  total_services_value: number;
  total_physical_commission: number;
  total_services_commission: number;
  total_commission: number;
}
