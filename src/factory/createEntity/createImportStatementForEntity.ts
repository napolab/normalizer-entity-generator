import * as ts from "typescript";

export function createImportStatementForEntity() {
  return ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamedImports([
        ts.createImportSpecifier(undefined, ts.createIdentifier("schema"))
      ])
    ),
    ts.createLiteral(ts.createIdentifier("normalizr"))
  );
}
