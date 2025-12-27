export function isValidEmail(email: string): boolean {
  // Simple, pragmatic regex (good enough for client-side UX)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string): string | null {
  if (!password || password.trim().length === 0) return 'Şifre zorunludur';
  return null;
}



