export function tokenClass(token: string, utility: string) {
  return `${utility}-[var(${token})]`
}
