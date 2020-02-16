"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var normalizr_1 = require("normalizr");
var user_1 = require("./user");
var comment_1 = require("./comment");
exports.article = new normalizr_1.schema.Entity("articles", {
    author: user_1.user,
    comments: [comment_1.comment]
});
