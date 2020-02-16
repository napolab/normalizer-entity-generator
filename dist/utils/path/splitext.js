"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
function splitext(path) {
    var splitPath = path_1.basename(path).split(".");
    var ext = splitPath[splitPath.length - 1];
    return [splitPath.join(".").replace("." + ext, ""), ext];
}
exports.splitext = splitext;
