import { getUserTimeZoneForRequest } from "@/utils/date";

const API_BASE_URL = import.meta.env.VITE_API_URL;

type HeaderType = {
  Authorization?: string;
};

type GetParams = {
  url: string;
  // queryParams pode ser um array de strings ou um objeto
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

export const api = {
  async get<T>({ url, queryParams, headers }: GetParams): Promise<T> {
    // Corrigido para aceitar apenas objetos ou null como queryParams, evitando o erro de tipagem do lint.
    const queryString = queryParams
      ? new URLSearchParams(queryParams as Record<string, string>).toString()
      : "";

    const response = await fetch(
      `${API_BASE_URL}${url}${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": getUserTimeZoneForRequest(),
          ...headers,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.json();
  },

  async post<T>({ url, data, headers }: PostParams): Promise<T> {
    const URL = `${API_BASE_URL}${url}`;

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-timezone": getUserTimeZoneForRequest(),
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.json();
  },

  async put<T>({ url, data, headers }: PutParams): Promise<T> {
    const URL = `${API_BASE_URL}${url}`;

    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-timezone": getUserTimeZoneForRequest(),
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.json();
  },

  async delete<T>({ url, headers }: DeleteParams): Promise<T> {
    const URL = `${API_BASE_URL}${url}`;

    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-timezone": getUserTimeZoneForRequest(),
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.json();
  },
};
