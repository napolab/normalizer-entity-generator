import * as ts from "typescript";

export function createPropertyAssignmentForArrayType(
  node: ts.Node
): string | null {
  const child = node.getChildAt(0);
  switch (node.kind) {
    case ts.SyntaxKind.TypeReference:
      return child.getText().toLowerCase();
    case ts.SyntaxKind.ArrayType: {
      const s = `[${createPropertyAssignmentForArrayType(child)}]`;
      return s.includes("null") ? null : s;
    }
    case ts.SyntaxKind.StringKeyword:
    case ts.SyntaxKind.NumberKeyword:
    default:
      return null;
  }
}
