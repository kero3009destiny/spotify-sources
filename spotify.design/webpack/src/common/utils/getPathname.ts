export function getPathname(): string {
  if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.pathname
  ) {
    return window.location.pathname;
  }

  return '';
}
