import { LoginType } from "@/pages/Login/schema";
import { UserRegisterType } from "@/pages/UserRegister/schema";
export const AUTH_KEYS = {
  login: (value: LoginType) => ["login", value],
  register: (value: UserRegisterType) => ["register", value],
  useUpdateProfile: (value: UserRegisterType) => ["useUpdateProfile", value],
} as const;
