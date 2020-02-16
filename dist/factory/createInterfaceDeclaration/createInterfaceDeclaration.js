"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
var createPropertySignature_1 = require("./createPropertySignature");
function interfaceMemberConverter(member) {
    var typeElements = [];
    var visit = function (node) {
        if (ts.isPropertySignature(node)) {
            var member_1 = createPropertySignature_1.createPropertySignature(node);
            member_1 && typeElements.push(member_1);
        }
        ts.forEachChild(node, visit);
    };
    visit(member);
    return typeElements;
}
function rebuildInterfaceMembers(members) {
    return members.map(interfaceMemberConverter).reduce(function (a, b) { return __spreadArrays(a, b); });
}
function createInterfaceDeclaration(node) {
    return ts.createInterfaceDeclaration(undefined, [ts.createModifier(ts.SyntaxKind.ExportKeyword)], node.name, undefined, node.heritageClauses, rebuildInterfaceMembers(node.members));
}
exports.createInterfaceDeclaration = createInterfaceDeclaration;
