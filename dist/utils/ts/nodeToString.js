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
function nodeToString(node, sourceFile) {
    var printer = ts.createPrinter();
    return printer.printList(ts.ListFormat.MultiLine, ts.createNodeArray(node), sourceFile);
}
exports.nodeToString = nodeToString;
