"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
function readDirPromise(path) {
    return new Promise(function (resolve, reject) {
        return fs_1.readdir(path, function (err, files) {
            return err ? reject(err) : resolve(files.map(function (name) { return path_1.join(path, name); }));
        });
    });
}
exports.readDirPromise = readDirPromise;
