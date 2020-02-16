"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = __importDefault(require("typescript"));
function createImportStatementForLocal(name) {
    return typescript_1.default.createImportDeclaration(undefined, undefined, typescript_1.default.createImportClause(undefined, typescript_1.default.createNamedImports([
        typescript_1.default.createImportSpecifier(undefined, typescript_1.default.createIdentifier(name))
    ])), typescript_1.default.createLiteral(typescript_1.default.createIdentifier("./" + name)));
}
exports.createImportStatementForLocal = createImportStatementForLocal;
