import { LoginType } from "@/pages/Login/schema";
export const AUTH_KEYS = {
  login: (value: LoginType) => ["login", value],
} as const;
