export function recursiveTrimArraySyntax(s: string): string {
  return s.includes("[]") ? recursiveTrimArraySyntax(s.replace("[]", "")) : s;
}
