type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data: T | null;
  rawText: string;
};

function tryParseJson(text: string): unknown | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function requestJson<TResponse>(
  url: string,
  method: HttpMethod,
  body?: unknown,
): Promise<ApiResult<TResponse>> {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const rawText = await res.text();
  const parsed = tryParseJson(rawText);

  return {
    ok: res.ok,
    status: res.status,
    data: (parsed as TResponse) ?? null,
    rawText,
  };
}




