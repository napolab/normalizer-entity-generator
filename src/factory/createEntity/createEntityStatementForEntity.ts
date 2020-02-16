import * as ts from "typescript";
import { createPropertyAssignmentForEntity } from "./createPropertyAssignmentForEntity";
import { createEntityStatement } from "./createEntityStatement";

export function createEntityStatementForEntity(node: ts.InterfaceDeclaration) {
  const nodes: ts.PropertyAssignment[] = [];
  node.members.map(member => {
    const visit = (node: ts.Node) => {
      if (ts.isPropertySignature(node)) {
        const name = node.getChildAt(0).getText();
        const excludeNameNode = node.getChildren().slice(1);
        excludeNameNode.forEach(node => {
          const p = createPropertyAssignmentForEntity(name, node);
          p && nodes.push(p);
        });
      }
      ts.forEachChild(node, visit);
    };

    visit(member);
  });
  return createEntityStatement(node.name.getText().toLowerCase(), nodes);
}
