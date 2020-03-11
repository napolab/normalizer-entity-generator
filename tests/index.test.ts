import * as ts from "typescript";
import { generator } from "../src/index";

describe("flat interface", () => {
  it("primitive interface", () => {
    const program = ts.createProgram(["tests/fixtures/base.ts"], {});
    const source = program.getSourceFile("tests/fixtures/base.ts");

    if (!source) {
      throw new Error("source file not found");
    }
  });

  it("extends interface", () => {
    const program = ts.createProgram(["tests/fixtures/user.ts"], {});
    const source = program.getSourceFile("tests/fixtures/user.ts");

    if (!source) {
      throw new Error("source file not found");
    }
  });
});

describe("nest interface", () => {
  it("single reference interface", () => {
    const program = ts.createProgram(["tests/fixtures/comment.ts"], {});
    const source = program.getSourceFile("tests/fixtures/comment.ts");

    if (!source) {
      throw new Error("source file not found");
    }
  });

  it("array reference interface", () => {
    const program = ts.createProgram(["tests/fixtures/article.ts"], {});
    const source = program.getSourceFile("tests/fixtures/article.ts");

    if (!source) {
      throw new Error("source file not found");
    }
  });
});
