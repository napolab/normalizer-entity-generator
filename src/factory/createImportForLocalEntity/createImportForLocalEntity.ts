import * as ts from "typescript";
import { createImportStatementFromInterfaceMember } from "./createImportStatementFromInterfaceMember";

export function createImportForLocalEntity(node: ts.InterfaceDeclaration) {
  return node.members
    .map(createImportStatementFromInterfaceMember)
    .reduce((a, b) => [...a, ...b]);
}
