import * as ts from "typescript";
import { isStringOrNumber } from "../../utils/ts/isStringOrNumber";
import { recursiveTrimArraySyntax } from "../../utils/ts/recursiveTrimArraySyntax";
import { createImportStatementForLocal } from "./createImportStatementForLocal";

export function createImportStatementFromInterfaceMember(
  member: ts.TypeElement
) {
  return member
    .getChildren()
    .filter(ts.isTypeNode)
    .filter(t => !isStringOrNumber(t))
    .map(t =>
      createImportStatementForLocal(
        recursiveTrimArraySyntax(t.getText()).toLowerCase()
      )
    );
}
