"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lte = void 0;
exports.$lte = function (x) { return ({
    runtimeInterface: true,
    test: function (a) { return a <= x; }
}); };
