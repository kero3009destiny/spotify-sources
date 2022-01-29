// ignore-string-externalization
import { login } from '@mrkt/features/auth';
import { useEffect } from 'react';
export function LoginRedirect() {
  useEffect(function () {
    login();
  }, []);
  return null;
}