import * as ts from "typescript";
import { readdirSync } from "fs";
import { probe } from "ts-probe";
import { join, basename } from "path";
import { headerCase } from "change-case";

type Config = Partial<{
  modelsPath: string;
  ignoreFiles: string[];
}>;
type CreateAstReturnType = [ts.Node[], ts.SourceFile?];
type CreatedAstReturnType = [ts.Node[], ts.SourceFile];
type CallbackOptions = {
  stringCallback: (name: string) => ts.Node;
  numberCallback: (name: string) => ts.Node;
  boolCallback: (name: string) => ts.Node;
  arrayCallback: (name: string) => ts.Node;
  typeRefCallback: (name: string) => ts.Node;
};

// ディレクトリ直下しか読まない
function readModelFiles(config?: Config) {
  const targetPath = config?.modelsPath ? join(process.cwd(), config?.modelsPath) : join(process.cwd(), "src/models");

  return readdirSync(targetPath)
    .map(p => join(targetPath, p))
    .filter(p => (config?.ignoreFiles || []).map(s => !p.endsWith(s)).some(b => b));
}

// ASTをstringに変換する関数
function printNode(nodeList: ts.Node[], sourceFile: ts.SourceFile) {
  const printer = ts.createPrinter();

  return printer.printList(ts.ListFormat.MultiLine, ts.createNodeArray(nodeList), sourceFile);
}

function baseTypeForArray(type: ts.Type, checker: ts.TypeChecker): ts.Type {
  if (ts.TypeFlags[type.flags] === "Object") {
    if (type.symbol.escapedName === "Array") {
      const ref = type as ts.TypeReference;
      return baseTypeForArray(checker.getTypeArguments(ref)[0], checker);
    } else {
      return type;
    }
  } else {
    return type;
  }
}

function createEntityAst(path: string): CreateAstReturnType {
  const program = ts.createProgram([path], { strictNullChecks: true });
  const source = program.getSourceFile(path);
  const checker = program.getTypeChecker();
  const typeText = headerCase(
    basename(path)
      .replace(".ts", "")
      .trim()
  );

  if (!source) return [[], undefined];

  const type = probe({
    program,
    source,
    typeText,
    extractInterface: true
  });

  if (!type) return [[], undefined];

  console.log(
    typeText,
    type.getProperties().map(s => {
      const declaration = s.declarations[0];
      const type = checker.getTypeAtLocation(declaration);
      const baseType = baseTypeForArray(type, checker);
      const kind = checker.typeToTypeNode(baseType)?.kind;
      if (!kind) return;

      return [s.name, checker.typeToString(baseType), ts.SyntaxKind[kind]];

      // if (ts.TypeFlags[type.flags] !== "Object") {
      //   if (type.isUnion()) return [s.name, type.types.map(t => checker.typeToString(t))];
      //   return [s.name, ts.TypeFlags[type.flags]];
      // } else if (type.symbol.escapedName === "Array") {
      //   const ref = type as ts.TypeReference;
      //   return [s.name, checker.typeToString(checker.getTypeArguments(ref)[0])];
      // } else {
      //   return [s.name, checker.typeToString(type)];
      // }
    })
  );

  return [[], source];
}

export function generator() {
  // const config: Config = readFileSync()
  const modelFiles = readModelFiles({ ignoreFiles: ["base.ts"] });
  modelFiles
    .map(createEntityAst)
    .filter((entityArgs): entityArgs is CreatedAstReturnType => !!entityArgs[1])
    .map(a => printNode(...a));
}

generator();
