import * as ts from "typescript";

export function isAvailableTypeNode(node: ts.Node) {
  return [
    ts.SyntaxKind.ArrayType,
    ts.SyntaxKind.StringKeyword,
    ts.SyntaxKind.TypeReference,
    ts.SyntaxKind.NumberKeyword
  ].includes(node.kind);
}

export function filterTargetMember(node: ts.Node): ts.Node {
  return node
    .getChildren()
    .slice(1)
    .filter(isAvailableTypeNode)[0];
}
