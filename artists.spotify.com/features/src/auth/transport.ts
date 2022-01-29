// ignore-string-externalization
import { accessTokenManager } from './accessTokenManager';

export async function tokenProvider(): Promise<[string, number]> {
  const token = await accessTokenManager.get();
  if (!token) throw new Error('logged out');
  return [token, 0];
}
