"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$literal = void 0;
var __1 = require("..");
var match_1 = require("../Maybe/functions/match");
var _unknown_1 = require("./$unknown");
exports.$literal = function (x) { return ({
    runtimeInterface: true,
    test: function (a) {
        return __1.patternMatch(a, match_1.match(x, function (_) { return true; }), match_1.match(_unknown_1.$unknown, function (_) { return false; }));
    }
}); };
