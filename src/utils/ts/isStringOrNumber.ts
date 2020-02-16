import * as ts from "typescript";

export function isStringOrNumber(node: ts.Node): boolean {
  if (node.kind === ts.SyntaxKind.ArrayType)
    return isStringOrNumber(node.getChildAt(0));
  else if (
    [ts.SyntaxKind.StringKeyword, ts.SyntaxKind.NumberKeyword].includes(
      node.kind
    )
  )
    return true;
  else return false;
}
