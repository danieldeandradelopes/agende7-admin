import User from "@/@backend-types/User";
import { PaginatedResult } from "@/@backend-types/PaginatedResult";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { USERS_KEYS } from "./keys";
import { ListUsersRequest } from "@/@backend-types/User";
export class AvailableHour {
  constructor(readonly time: string) {}
}

export const useGetUsers = ({ page, limit }: ListUsersRequest) => {
  const { getToken } = useAuth();

  return useQuery<PaginatedResult<User>, Error, PaginatedResult<User>>({
    queryKey: [USERS_KEYS.useGetUsers, page, limit],
    queryFn: async () => {
      const response = await api.get<PaginatedResult<User>>({
        url: `/users?page=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken(),
  });
};
