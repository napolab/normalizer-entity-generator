import * as fs from "fs";
import * as ts from "typescript";
import { join } from "path";
import { splitext } from "./utils/path/splitext";
import { replaceLastDir } from "./utils/path/replaceLastDir";
import { readDirPromise } from "./utils/promise/readdir";
import { mkdirPromise } from "./utils/promise/mkdir";
import { nodeToString } from "./utils/ts/nodeToString";

import { createInterfaceDeclaration } from "./factory/createInterfaceDeclaration";
import {
  createEntityStatementForEntity,
  createImportStatementForEntity
} from "./factory/createEntity/";
import { createImportForLocalEntity } from "./factory/createImportForLocalEntity";

function createInterface(sourceFile: ts.SourceFile) {
  return sourceFile
    .getChildAt(0)
    .getChildren()
    .filter(ts.isInterfaceDeclaration)
    .map(createInterfaceDeclaration);
}

function createEntity(sourceFile: ts.SourceFile) {
  return sourceFile
    .getChildAt(0)
    .getChildren()
    .filter(ts.isInterfaceDeclaration)
    .map(createEntityStatementForEntity);
}

function createExportStatement(sourceFile: ts.SourceFile) {
  return sourceFile
    .getChildAt(0)
    .getChildren()
    .filter(ts.isInterfaceDeclaration)
    .map(createImportForLocalEntity)
    .reduce((a, b) => [...a, ...b]);
}

async function execute(inputPath: string) {
  const [name, ext] = splitext(inputPath);
  const outputPath = replaceLastDir(inputPath, "normalizer");
  const program = ts.createProgram([inputPath], {});
  program.getTypeChecker();
  const sourceFile = program.getSourceFile(inputPath);
  if (!sourceFile) return;

  await mkdirPromise(outputPath);
  fs.writeFileSync(
    join(outputPath, `${name.replace(".interface", "")}.${ext}`),
    [
      nodeToString([createImportStatementForEntity()], sourceFile),
      nodeToString(createExportStatement(sourceFile), sourceFile),
      nodeToString(createInterface(sourceFile), sourceFile),
      nodeToString(createEntity(sourceFile), sourceFile)
    ].join("\n")
  );
}

async function main() {
  const files = await readDirPromise(join(process.cwd(), "src", "entities"));
  const targetFiles = files.filter(s => s.includes("interface"));
  targetFiles.forEach(execute);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
