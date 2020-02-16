"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var createImportStatementFromInterfaceMember_1 = require("./createImportStatementFromInterfaceMember");
function createImportForLocalEntity(node) {
    return node.members
        .map(createImportStatementFromInterfaceMember_1.createImportStatementFromInterfaceMember)
        .reduce(function (a, b) { return __spreadArrays(a, b); });
}
exports.createImportForLocalEntity = createImportForLocalEntity;
