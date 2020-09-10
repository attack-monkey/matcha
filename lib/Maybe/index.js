"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = void 0;
var none_1 = require("./functions/none");
var some_1 = require("./functions/some");
var match_1 = require("./functions/match");
exports.Maybe = {
    none: none_1.none,
    some: some_1.some,
    match: match_1.match
};
