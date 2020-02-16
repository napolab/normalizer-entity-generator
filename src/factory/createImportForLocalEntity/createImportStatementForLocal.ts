import ts from "typescript";

export function createImportStatementForLocal(name: string) {
  return ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamedImports([
        ts.createImportSpecifier(undefined, ts.createIdentifier(name))
      ])
    ),
    ts.createLiteral(ts.createIdentifier(`./${name}`))
  );
}
