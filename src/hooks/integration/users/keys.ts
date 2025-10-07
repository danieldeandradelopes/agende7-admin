import { ListUsersRequest } from "@/@backend-types/User";

export const USERS_KEYS = {
  useGetUsers: (params: ListUsersRequest) => ["useGetUsers", params],
} as const;
