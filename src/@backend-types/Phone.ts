export interface PhoneProps {
  id: number;
  phone_number: string;
  is_whatsapp: boolean;
  is_cellphone: boolean;
  barber_shop_id: number;
  updated_at?: string;
  created_at?: string;
}

export default class Phone {
  readonly id: number;
  readonly phone_number: string;
  readonly is_whatsapp: boolean;
  readonly is_cellphone: boolean;
  readonly barber_shop_id: number;
  readonly updated_at?: string;
  readonly created_at?: string;

  constructor({
    id,
    phone_number,
    is_whatsapp,
    is_cellphone,
    barber_shop_id,
    updated_at,
    created_at,
  }: PhoneProps) {
    this.id = id;
    this.phone_number = phone_number;
    this.is_whatsapp = is_whatsapp;
    this.is_cellphone = is_cellphone;
    this.barber_shop_id = barber_shop_id;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
