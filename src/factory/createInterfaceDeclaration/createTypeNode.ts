import * as ts from "typescript";
import { createArrayTypeNode } from "./createArrayTypeNode";

export function createTypeNode(node: ts.Node) {
  switch (node.kind) {
    case ts.SyntaxKind.ArrayType:
      return createArrayTypeNode(node);
    case ts.SyntaxKind.StringKeyword:
    case ts.SyntaxKind.TypeReference:
      return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    case ts.SyntaxKind.NumberKeyword:
      return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    default:
      return ts.createNull();
  }
}
