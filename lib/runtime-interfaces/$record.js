"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$record = void 0;
var __1 = require("..");
var match_1 = require("../Maybe/functions/match");
var _unknown_1 = require("./$unknown");
exports.$record = function (type_) { return ({
    runtimeInterface: true,
    test: function (a) {
        return typeof a === 'object'
            && Object.keys(a).map(function (key) {
                return __1.patternMatch(a[key], match_1.match(type_, function (_) { return true; }), match_1.match(_unknown_1.$unknown, function (_) { return false; }));
            }).every(function (item) { return item === true; });
    }
}); };
