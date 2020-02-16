import * as ts from "typescript";

export function createArrayTypeNode(node: ts.Node): ts.ArrayTypeNode {
  const childNode = node.getChildAt(0);
  function createTypeNode(): ts.TypeNode {
    switch (childNode.kind) {
      case ts.SyntaxKind.ArrayType:
        return createArrayTypeNode(childNode);
      case ts.SyntaxKind.NumberKeyword:
        return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
      case ts.SyntaxKind.TypeReference:
        return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
      case ts.SyntaxKind.StringKeyword:
        return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
      default:
        return ts.createNull();
    }
  }
  return ts.createArrayTypeNode(createTypeNode());
}
