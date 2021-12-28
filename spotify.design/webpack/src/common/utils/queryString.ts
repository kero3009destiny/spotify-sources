export function getQueryString(property: string): string | null {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(property);
}

export function removeQueryString(url?: string): string {
  let str = url;
  if (!str) str = window.location.href;
  return str.substring(0, str.indexOf('?'));
}
