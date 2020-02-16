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
var createArrayTypeNode_1 = require("./createArrayTypeNode");
function createTypeNode(node) {
    switch (node.kind) {
        case ts.SyntaxKind.ArrayType:
            return createArrayTypeNode_1.createArrayTypeNode(node);
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.TypeReference:
            return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
        case ts.SyntaxKind.NumberKeyword:
            return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
        default:
            return ts.createNull();
    }
}
exports.createTypeNode = createTypeNode;
