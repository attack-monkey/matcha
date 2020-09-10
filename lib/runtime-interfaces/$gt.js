"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$gt = void 0;
exports.$gt = function (x) { return ({
    runtimeInterface: true,
    test: function (a) { return a > x; }
}); };
