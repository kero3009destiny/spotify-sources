import { useRouter } from 'next/router';

export function useLocales() {
  return useRouter()?.locales ?? [];
}
