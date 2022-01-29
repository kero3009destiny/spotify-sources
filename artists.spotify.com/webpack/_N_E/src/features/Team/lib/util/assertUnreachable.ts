// ignore-string-externalization
export function assertUnreachable(msg) {
  throw new Error("Failed exhaustive check: ".concat(JSON.stringify(msg)));
}