import Manifest from "@/@backend-types/Manifest";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { MANIFEST_KEYS } from "./keys";

export const useGetManifest = (barbershopId?: number) => {
  const { getToken } = useAuth();

  return useQuery<Manifest, Error, Manifest>({
    queryKey: [MANIFEST_KEYS.useGetManifest, barbershopId],
    queryFn: async () => {
      const response = await api.get<Manifest>({
        url: `/manifest`,
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
