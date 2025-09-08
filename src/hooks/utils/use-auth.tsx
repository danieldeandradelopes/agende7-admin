import Authentication, {
  BarberShopAuthentication,
} from "@/@backend-types/Authentication";
import User from "@/@backend-types/User";
import { useCustomLocalStorage } from "./use-custom-local-storage";
import { useCustomNavigate } from "./use-custom-navigate";

const AUTH_STORAGE_KEY = "auth";

export const defaultBarberShop: BarberShopAuthentication = {
  id: 0,
  name: "",
  cover: "",
  address: "",
  description: "",
  latitude: 0,
  bio: "",
  phones: [],
  longitude: 0,
  specialties: "",
  rate: 0,
  working_hours: [],
};

export const defaultUser: User = {
  access_level: "client",
  avatar: "",
  email: "",
  id: 0,
  name: "",
  phone: "",
  created_at: "",
  password: "",
  updated_at: "",
};

export function useAuth() {
  const navigate = useCustomNavigate();
  const [auth, setAuth, removeAuth] = useCustomLocalStorage<Authentication>(
    AUTH_STORAGE_KEY,
    {
      token: "",
      user: defaultUser,
      barbershop: defaultBarberShop,
    }
  );

  const login = (
    token: string,
    user: User,
    barbershop: BarberShopAuthentication
  ) => {
    setAuth({ token, user, barbershop: barbershop });
  };

  const register = (user: User) => {
    setAuth({ ...auth, user });
  };

  const logout = () => {
    removeAuth();
    navigate("/");
  };

  const isAuthenticated = () => {
    return !!auth.token;
  };

  const getUser = (): User => {
    return auth.user;
  };

  const getBarberInfo = (): BarberShopAuthentication => {
    return auth.barbershop ?? defaultBarberShop;
  };

  const getToken = (): string => {
    return auth.token;
  };

  const getPhoneWhatsapp = (): string => {
    const whatsAppPhones = auth.barbershop?.phones?.find(
      (phone) => phone.is_whatsapp
    );

    const phone = whatsAppPhones
      ? `55${whatsAppPhones?.phone_number?.replace(/\D/g, "")}`
      : "";

    return phone;
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    getUser,
    getToken,
    getBarberInfo,
    getPhoneWhatsapp,
  };
}
