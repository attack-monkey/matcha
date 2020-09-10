"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$array = void 0;
var __1 = require("..");
var match_1 = require("../Maybe/functions/match");
var _unknown_1 = require("./$unknown");
exports.$array = function (type_) { return ({
    runtimeInterface: true,
    test: function (a) {
        return Array.isArray(a)
            && a.map(function (item) {
                return __1.patternMatch(item, match_1.match(type_, function (_) { return true; }), match_1.match(_unknown_1.$unknown, function (_) { return false; }));
            }).every(function (item) { return item === true; });
    }
}); };
