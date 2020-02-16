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
function isStringOrNumber(node) {
    if (node.kind === ts.SyntaxKind.ArrayType)
        return isStringOrNumber(node.getChildAt(0));
    else if ([ts.SyntaxKind.StringKeyword, ts.SyntaxKind.NumberKeyword].includes(node.kind))
        return true;
    else
        return false;
}
exports.isStringOrNumber = isStringOrNumber;
