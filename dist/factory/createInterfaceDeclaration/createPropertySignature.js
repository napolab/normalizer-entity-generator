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
var index_1 = require("../common/filter/index");
var createTypeNode_1 = require("./createTypeNode");
function createPropertySignature(node) {
    var name = node.getChildAt(0).getText();
    var targetMember = index_1.filterTargetMember(node);
    var member = createTypeNode_1.createTypeNode(targetMember);
    return ts.createPropertySignature(undefined, name, undefined, member, undefined);
}
exports.createPropertySignature = createPropertySignature;
