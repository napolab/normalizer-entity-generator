import * as ts from "typescript";

export function nodeToString(node: ts.Node[], sourceFile: ts.SourceFile) {
  const printer = ts.createPrinter();
  return printer.printList(
    ts.ListFormat.MultiLine,
    ts.createNodeArray(node),
    sourceFile
  );
}
