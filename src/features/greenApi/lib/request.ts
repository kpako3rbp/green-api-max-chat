export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
  }
}

export const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new ApiError('Ошибка при выполнении запроса', response.status);
  }

  const text = await response.text();

  if (!text) {
    return null as T;
  }

  return JSON.parse(text) as T;
};
