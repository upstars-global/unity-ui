type ClassToken = string | false | null | undefined | readonly string[]

export function flattenClasses(...tokens: ClassToken[]) {
  return tokens
    .flatMap((token) => Array.isArray(token) ? token : [token])
    .filter(Boolean)
    .join(' ')
}
