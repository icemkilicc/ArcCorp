import { API_BASE_URL } from '../constants/api';
import { requestJson } from './http';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  password_repeat: string;
};

export type LoginResponse = {
  message?: string;
};

export type RegisterResponse = {
  message?: string;
  user_id?: number;
};

export type AuthResult<TData> = {
  /** Transport-level success (HTTP 2xx etc.) */
  ok: boolean;
  status: number;
  /** Parsed JSON payload (if any) */
  data: TData | null;
  rawText: string;

  /** Business-level success derived from backend body (backend always returns 200) */
  success: boolean;
  message: string;
};

function extractMessage(data: unknown, rawText: string): string {
  if (data && typeof data === 'object' && 'message' in data) {
    const msg = (data as any).message;
    if (typeof msg === 'string') return msg;
  }
  if (typeof rawText === 'string' && rawText.trim().length > 0) return rawText.trim();
  return 'Bilinmeyen cevap';
}

export async function login(req: LoginRequest): Promise<AuthResult<LoginResponse>> {
  const res = await requestJson<LoginResponse>(`${API_BASE_URL}/login`, 'POST', req);
  const message = extractMessage(res.data, res.rawText);
  const success = message.trim() === 'OK';
  return { ...res, success, message };
}

export async function register(
  req: RegisterRequest,
): Promise<AuthResult<RegisterResponse> & { userId?: number }> {
  const res = await requestJson<RegisterResponse>(
    `${API_BASE_URL}/register`,
    'POST',
    req,
  );
  const message = extractMessage(res.data, res.rawText);
  const userId =
    res.data && typeof res.data === 'object' && 'user_id' in res.data
      ? (res.data as any).user_id
      : undefined;

  // Backend success can be inferred either by message or by presence of user_id
  const success = (typeof userId === 'number' && Number.isFinite(userId)) || message.trim() === 'Kayıt başarılı';

  return { ...res, success, message, userId };
}



