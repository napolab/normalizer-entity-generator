import * as ts from "typescript";
import { createPropertyAssignmentForArrayType } from "./createPropertyAssignmentForArrayType";

export function createPropertyAssignmentForEntity(name: string, node: ts.Node) {
  if (node.kind === ts.SyntaxKind.ArrayType) {
    const s = createPropertyAssignmentForArrayType(node.getChildAt(0));
    return s !== null
      ? ts.createPropertyAssignment(name, ts.createIdentifier(`[${s}]`))
      : (s as null);
  } else if (node.kind === ts.SyntaxKind.TypeReference) {
    return ts.createPropertyAssignment(
      name,
      ts.createIdentifier(node.getText().toLowerCase())
    );
  } else {
    return null;
  }
}
