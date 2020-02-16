"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function recursiveTrimArraySyntax(s) {
    return s.includes("[]") ? recursiveTrimArraySyntax(s.replace("[]", "")) : s;
}
exports.recursiveTrimArraySyntax = recursiveTrimArraySyntax;
