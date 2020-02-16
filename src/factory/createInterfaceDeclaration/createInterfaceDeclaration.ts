import * as ts from "typescript";
import { createPropertySignature } from "./createPropertySignature";

function interfaceMemberConverter(member: ts.TypeElement) {
  const typeElements: ts.TypeElement[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isPropertySignature(node)) {
      const member = createPropertySignature(node);
      member && typeElements.push(member);
    }
    ts.forEachChild(node, visit);
  };

  visit(member);
  return typeElements;
}

function rebuildInterfaceMembers(members: ts.NodeArray<ts.TypeElement>) {
  return members.map(interfaceMemberConverter).reduce((a, b) => [...a, ...b]);
}

export function createInterfaceDeclaration(node: ts.InterfaceDeclaration) {
  return ts.createInterfaceDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    node.name,
    undefined,
    node.heritageClauses,
    rebuildInterfaceMembers(node.members)
  );
}
