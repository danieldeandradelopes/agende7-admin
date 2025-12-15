import { loadingManager } from "@/context/loading";
import { getUserTimeZoneForRequest } from "@/utils/date";

const API_BASE_URL = import.meta.env.VITE_API_URL;

type HeaderType = {
  Authorization?: string;
};

type GetParams = {
  url: string;
  queryParams?: Record<string, string> | null | string[];
  headers?: HeaderType;
};

type PostParams = {
  url: string;
  data: unknown;
  headers?: HeaderType;
};

type PutParams = {
  url: string;
  data: unknown;
  headers?: HeaderType;
};

type DeleteParams = {
  url: string;
  headers?: HeaderType;
};

interface RefreshTokenResponse {
  accessToken: string;
  user: {
    id: number;
    access_level: string;
    barber_shop_id: number;
  };
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

async function refreshToken(): Promise<string> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": getUserTimeZoneForRequest(),
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Erro no refresh token: ${response.status}`);
      }

      const data: RefreshTokenResponse = await response.json();

      const authData = localStorage.getItem("auth");
      if (authData) {
        const parsedAuth = JSON.parse(authData);
        parsedAuth.token = data.accessToken;
        localStorage.setItem("auth", JSON.stringify(parsedAuth));
      }

      return data.accessToken;
    } catch (error) {
      localStorage.removeItem("auth");
      window.location.href = "/";
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function makeRequestWithRetry<T>(
  requestFn: () => Promise<Response>
): Promise<T> {
  loadingManager.start();
  try {
    const response = await requestFn();

    if (response.status === 401) {
      await refreshToken();

      const retryResponse = await requestFn();

      if (!retryResponse.ok) {
        let errorMessage = `Erro na requisição: ${retryResponse.status}`;
        try {
          const errorData = await retryResponse.json();
          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Se não conseguir parsear JSON, usa a mensagem padrão
        }
        throw new Error(errorMessage);
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      let errorMessage = `Erro na requisição: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Se não conseguir parsear JSON, usa a mensagem padrão
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } finally {
    loadingManager.stop();
  }
}

export const api = {
  async get<T>({ url, queryParams, headers }: GetParams): Promise<T> {
    const queryString = queryParams
      ? new URLSearchParams(queryParams as Record<string, string>).toString()
      : "";

    return makeRequestWithRetry<T>(() =>
      fetch(`${API_BASE_URL}${url}${queryString ? `?${queryString}` : ""}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": getUserTimeZoneForRequest(),
          ...headers,
        },
        credentials: "include",
      })
    );
  },

  async post<T>({ url, data, headers }: PostParams): Promise<T> {
    return makeRequestWithRetry<T>(() =>
      fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": getUserTimeZoneForRequest(),
          ...headers,
        },
        body: JSON.stringify(data),
        credentials: "include",
      })
    );
  },

  async put<T>({ url, data, headers }: PutParams): Promise<T> {
    return makeRequestWithRetry<T>(() =>
      fetch(`${API_BASE_URL}${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": getUserTimeZoneForRequest(),
          ...headers,
        },
        body: JSON.stringify(data),
        credentials: "include",
      })
    );
  },

  async delete<T>({ url, headers }: DeleteParams): Promise<T> {
    return makeRequestWithRetry<T>(() =>
      fetch(`${API_BASE_URL}${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": getUserTimeZoneForRequest(),
          ...headers,
        },
        credentials: "include",
      })
    );
  },
};
