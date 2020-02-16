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
function isAvailableTypeNode(node) {
    return [
        ts.SyntaxKind.ArrayType,
        ts.SyntaxKind.StringKeyword,
        ts.SyntaxKind.TypeReference,
        ts.SyntaxKind.NumberKeyword
    ].includes(node.kind);
}
exports.isAvailableTypeNode = isAvailableTypeNode;
function filterTargetMember(node) {
    return node
        .getChildren()
        .slice(1)
        .filter(isAvailableTypeNode)[0];
}
exports.filterTargetMember = filterTargetMember;
