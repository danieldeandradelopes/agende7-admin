interface BarberProps {
  id: number;
  user_id: number;
  barber_shop_id: number;
  is_active: boolean;
  available_hours: AvailableHour[];
  name: string;
  bio: string;
  phone: string;
  rate: number;
  avatar?: string;
  email?: string;
  specialties?: string;
  created_at?: string;
  updated_at?: string;
}

export class AvailableHour {
  constructor(readonly time: string) {}
}

export default class Barber {
  readonly id: number;
  readonly user_id: number;
  readonly barber_shop_id: number;
  readonly is_active: boolean;
  readonly available_hours: AvailableHour[];
  readonly name: string;
  readonly bio: string;
  readonly phone: string;
  readonly rate: number;
  readonly avatar?: string;
  readonly email?: string;
  readonly specialties?: string;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor({
    id,
    user_id,
    barber_shop_id,
    is_active,
    available_hours,
    name,
    bio,
    phone,
    rate,
    avatar,
    email,
    specialties,
    created_at,
    updated_at,
  }: BarberProps) {
    this.id = id;
    this.user_id = user_id;
    this.barber_shop_id = barber_shop_id;
    this.is_active = is_active;
    this.available_hours = available_hours;
    this.name = name;
    this.bio = bio;
    this.phone = phone;
    this.rate = rate;
    this.avatar = avatar;
    this.email = email;
    this.specialties = specialties;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
