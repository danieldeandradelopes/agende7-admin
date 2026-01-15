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

// Função auxiliar para obter o token do localStorage
function getTokenFromStorage(): string | null {
  try {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      return parsedAuth.token || null;
    }
    return null;
  } catch {
    return null;
  }
}

// Função auxiliar para atualizar o token no localStorage
function updateTokenInStorage(newToken: string): void {
  try {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      parsedAuth.token = newToken;
      localStorage.setItem("auth", JSON.stringify(parsedAuth));
    }
  } catch {
    // Se não conseguir atualizar, ignora
  }
}

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
      updateTokenInStorage(data.accessToken);

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
      // Tenta fazer refresh do token
      await refreshToken();

      // Refaz a requisição com o novo token
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

    return makeRequestWithRetry<T>(async () => {
      const token = getTokenFromStorage();
      const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        "x-timezone": getUserTimeZoneForRequest(),
        ...headers,
      };

      // Adiciona o token se disponível e não foi fornecido nos headers customizados
      if (token && !headers?.Authorization) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }

      return fetch(
        `${API_BASE_URL}${url}${queryString ? `?${queryString}` : ""}`,
        {
          method: "GET",
          headers: requestHeaders,
          credentials: "include",
        }
      );
    });
  },

  async post<T>({ url, data, headers }: PostParams): Promise<T> {
    return makeRequestWithRetry<T>(async () => {
      const token = getTokenFromStorage();
      const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        "x-timezone": getUserTimeZoneForRequest(),
        ...headers,
      };

      if (token && !headers?.Authorization) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }

      return fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data),
        credentials: "include",
      });
    });
  },

  async put<T>({ url, data, headers }: PutParams): Promise<T> {
    return makeRequestWithRetry<T>(async () => {
      const token = getTokenFromStorage();
      const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        "x-timezone": getUserTimeZoneForRequest(),
        ...headers,
      };

      if (token && !headers?.Authorization) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }

      return fetch(`${API_BASE_URL}${url}`, {
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify(data),
        credentials: "include",
      });
    });
  },

  async delete<T>({ url, headers }: DeleteParams): Promise<T> {
    return makeRequestWithRetry<T>(async () => {
      const token = getTokenFromStorage();
      const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        "x-timezone": getUserTimeZoneForRequest(),
        ...headers,
      };

      if (token && !headers?.Authorization) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }

      return fetch(`${API_BASE_URL}${url}`, {
        method: "DELETE",
        headers: requestHeaders,
        credentials: "include",
      });
    });
  },
};
