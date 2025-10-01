import { BarberShopAuthentication } from "./Authentication";
import Phone from "./Phone";
import User from "./User";

export interface UserSessionProps {
  user: User;
  barbershop?: BarberShopAuthentication | null;
  phones?: Phone[] | null;
}

export default class UserSession {
  readonly user: User;
  readonly barbershop?: BarberShopAuthentication | null;
  readonly phones?: Phone[] | null;

  constructor({ user, barbershop, phones }: UserSessionProps) {
    this.user = user;
    this.barbershop = barbershop;
    this.phones = phones;
  }
}
