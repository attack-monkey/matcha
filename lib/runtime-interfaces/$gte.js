"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$gte = void 0;
exports.$gte = function (x) { return ({
    runtimeInterface: true,
    test: function (a) { return a >= x; }
}); };
