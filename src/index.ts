/* eslint-disable no-empty */
import * as ts from "typescript";
import { join } from "path";
import pluralize from "pluralize";
import { splitext } from "./utils/path/splitext";
import { readDirPromise } from "./utils/promise/readdir";
import { createInterfaceDeclaration } from "./factory/createInterfaceDeclaration";


function createInterface(sourceFile: ts.SourceFile) {
  return sourceFile
    .getChildAt(0)
    .getChildren()
    .filter(ts.isInterfaceDeclaration)
    .map(createInterfaceDeclaration);
}

function execute(filePath: string) {
  const [name, ext] = splitext(filePath);
  console.log(
    `--------------------------${name}.${ext}--------------------------`
  );
  const program = ts.createProgram([filePath], {});
  program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);
  const printer = ts.createPrinter();
  if (!sourceFile) return;

  console.log(
    printer.printList(
      ts.ListFormat.MultiLine,
      ts.createNodeArray(createInterface(sourceFile)),
      sourceFile
    )
  );
  console.log(
    printer.printList(
      ts.ListFormat.MultiLine,
      ts.createNodeArray([createNormalizerEntityStatement("huga", hoge())]),
      sourceFile
    )
  );
}

async function main() {
  const files = await readDirPromise(join(process.cwd(), "src", "entities"));
  const targetFiles = files.filter(s => s.includes("interface"));
  targetFiles.forEach(execute);
}

main();
