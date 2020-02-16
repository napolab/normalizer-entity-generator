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
var createPropertyAssignmentForEntity_1 = require("./createPropertyAssignmentForEntity");
var createEntityStatement_1 = require("./createEntityStatement");
function createEntityStatementForEntity(node) {
    var nodes = [];
    node.members.map(function (member) {
        var visit = function (node) {
            if (ts.isPropertySignature(node)) {
                var name_1 = node.getChildAt(0).getText();
                var excludeNameNode = node.getChildren().slice(1);
                excludeNameNode.forEach(function (node) {
                    var p = createPropertyAssignmentForEntity_1.createPropertyAssignmentForEntity(name_1, node);
                    p && nodes.push(p);
                });
            }
            ts.forEachChild(node, visit);
        };
        visit(member);
    });
    return createEntityStatement_1.createEntityStatement(node.name.getText().toLowerCase(), nodes);
}
exports.createEntityStatementForEntity = createEntityStatementForEntity;
