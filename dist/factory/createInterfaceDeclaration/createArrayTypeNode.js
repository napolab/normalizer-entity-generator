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
function createArrayTypeNode(node) {
    var childNode = node.getChildAt(0);
    function createTypeNode() {
        switch (childNode.kind) {
            case ts.SyntaxKind.ArrayType:
                return createArrayTypeNode(childNode);
            case ts.SyntaxKind.NumberKeyword:
                return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
            case ts.SyntaxKind.TypeReference:
                return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
            case ts.SyntaxKind.StringKeyword:
                return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
            default:
                return ts.createNull();
        }
    }
    return ts.createArrayTypeNode(createTypeNode());
}
exports.createArrayTypeNode = createArrayTypeNode;
