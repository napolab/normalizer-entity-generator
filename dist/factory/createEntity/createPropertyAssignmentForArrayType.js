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
function createPropertyAssignmentForArrayType(node) {
    var child = node.getChildAt(0);
    switch (node.kind) {
        case ts.SyntaxKind.TypeReference:
            return child.getText().toLowerCase();
        case ts.SyntaxKind.ArrayType: {
            var s = "[" + createPropertyAssignmentForArrayType(child) + "]";
            return s.includes("null") ? null : s;
        }
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.NumberKeyword:
        default:
            return null;
    }
}
exports.createPropertyAssignmentForArrayType = createPropertyAssignmentForArrayType;
