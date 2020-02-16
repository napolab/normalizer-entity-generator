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
var isStringOrNumber_1 = require("../../utils/ts/isStringOrNumber");
var recursiveTrimArraySyntax_1 = require("../../utils/ts/recursiveTrimArraySyntax");
var createImportStatementForLocal_1 = require("./createImportStatementForLocal");
function createImportStatementFromInterfaceMember(member) {
    return member
        .getChildren()
        .filter(ts.isTypeNode)
        .filter(function (t) { return !isStringOrNumber_1.isStringOrNumber(t); })
        .map(function (t) {
        return createImportStatementForLocal_1.createImportStatementForLocal(recursiveTrimArraySyntax_1.recursiveTrimArraySyntax(t.getText()).toLowerCase());
    });
}
exports.createImportStatementFromInterfaceMember = createImportStatementFromInterfaceMember;
