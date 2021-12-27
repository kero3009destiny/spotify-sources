import { getDocument } from './document';

export const getCookie = (name: string): string | undefined =>
  getDocument()
    .cookie?.split(';')
    ?.find((entry) => entry.split('=')[0]?.trim() === name)
    ?.split('=')[1]
    ?.trim();
