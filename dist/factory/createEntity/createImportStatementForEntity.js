"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
function createImportStatementForEntity() {
    return ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamedImports([
        ts.createImportSpecifier(undefined, ts.createIdentifier("schema"))
    ])), ts.createLiteral(ts.createIdentifier("normalizr")));
}
exports.createImportStatementForEntity = createImportStatementForEntity;
