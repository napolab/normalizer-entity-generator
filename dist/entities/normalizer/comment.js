"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var normalizr_1 = require("normalizr");
var user_1 = require("./user");
exports.comment = new normalizr_1.schema.Entity("comments", {
    commenter: user_1.user
});
