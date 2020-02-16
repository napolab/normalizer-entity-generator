"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
function replaceLastDir(path, dir) {
    var slicePath = path
        .split("/")
        .slice(0, -1)
        .join("/");
    return path_1.join(slicePath, dir);
}
exports.replaceLastDir = replaceLastDir;
