"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
var pluralize_1 = __importDefault(require("pluralize"));
function createEntityStatement(entityName, memberProperties) {
    return ts.createVariableStatement([ts.createModifier(ts.SyntaxKind.ExportKeyword)], ts.createVariableDeclarationList([
        ts.createVariableDeclaration(entityName, undefined, ts.createNew(ts.createIdentifier("schema.Entity"), undefined, [
            ts.createStringLiteral(pluralize_1.default(entityName)),
            ts.createObjectLiteral(memberProperties, true)
        ]))
    ], ts.NodeFlags.Const));
}
exports.createEntityStatement = createEntityStatement;
