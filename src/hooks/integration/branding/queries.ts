import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BRANDING_KEYS } from "./keys";
import Branding from "@/@backend-types/Branding";
import { useAuth } from "@/hooks/utils/use-auth";

export const useGetBranding = () => {
  return useQuery<Branding[], Error, Branding[]>({
    queryKey: [BRANDING_KEYS.branding],
    queryFn: async () => {
      const response = await api.get<Branding[]>({
        url: `/branding`,
      });

      return response;
    },
    retry: false,
  });
};

export const useGetBrandingById = (id: number) => {
  const { getToken } = useAuth();
  return useQuery<Branding, Error, Branding>({
    queryKey: [BRANDING_KEYS.brandingById, id],
    queryFn: async () => {
      const response = await api.get<Branding>({
        url: `/branding/${id}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response;
    },
    retry: false,
    enabled: !!id,
  });
};
