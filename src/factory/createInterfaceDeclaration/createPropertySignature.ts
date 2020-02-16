import * as ts from "typescript";
import { filterTargetMember } from "../common/filter/index";
import { createTypeNode } from "./createTypeNode";

export function createPropertySignature(
  node: ts.PropertySignature
): ts.PropertySignature {
  const name = node.getChildAt(0).getText();
  const targetMember = filterTargetMember(node);
  const member = createTypeNode(targetMember);

  return ts.createPropertySignature(
    undefined,
    name,
    undefined,
    member,
    undefined
  );
}
