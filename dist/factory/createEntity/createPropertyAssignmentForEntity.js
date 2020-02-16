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
var createPropertyAssignmentForArrayType_1 = require("./createPropertyAssignmentForArrayType");
function createPropertyAssignmentForEntity(name, node) {
    if (node.kind === ts.SyntaxKind.ArrayType) {
        var s = createPropertyAssignmentForArrayType_1.createPropertyAssignmentForArrayType(node.getChildAt(0));
        return s !== null
            ? ts.createPropertyAssignment(name, ts.createIdentifier("[" + s + "]"))
            : s;
    }
    else if (node.kind === ts.SyntaxKind.TypeReference) {
        return ts.createPropertyAssignment(name, ts.createIdentifier(node.getText().toLowerCase()));
    }
    else {
        return null;
    }
}
exports.createPropertyAssignmentForEntity = createPropertyAssignmentForEntity;
