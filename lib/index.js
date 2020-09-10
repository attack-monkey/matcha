"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.with_ = exports.patternMatchCompose = exports.patternMatch = exports.isSome = exports.isNone = exports.die = void 0;
var match_1 = require("./Maybe/functions/match");
exports.die = function (msg) { throw new Error(msg); };
exports.isNone = function (a) { return a === undefined || a === null; };
exports.isSome = function (a) { return !exports.isNone(a); };
exports.patternMatch = function (a, b, c, d, e) {
    var ba = b ? b(a) : a;
    var cba = c ? c(ba) : ba;
    var dcba = d ? d(cba) : cba;
    var edcba = e ? e(dcba) : dcba;
    return (edcba === null || edcba === void 0 ? void 0 : edcba.done) === true
        ? edcba.thunk()
        : edcba;
};
exports.patternMatchCompose = function (b, c, d, e) { return function (a) { return exports.patternMatch(a, b, c, d, e); }; };
exports.with_ = match_1.match;
