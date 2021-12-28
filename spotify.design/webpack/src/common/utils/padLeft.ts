export function padLeft(val: string | number): string {
  const str = val.toString();
  return str.padStart(2, '0');
}
