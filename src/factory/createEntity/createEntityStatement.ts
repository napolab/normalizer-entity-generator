import * as ts from "typescript";
import pluralize from "pluralize";

export function createEntityStatement(
  entityName: string,
  memberProperties: ts.PropertyAssignment[]
) {
  return ts.createVariableStatement(
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          entityName,
          undefined,
          ts.createNew(ts.createIdentifier("schema.Entity"), undefined, [
            ts.createStringLiteral(pluralize(entityName)),
            ts.createObjectLiteral(memberProperties, true)
          ])
        )
      ],
      ts.NodeFlags.Const
    )
  );
}
