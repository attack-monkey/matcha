"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lt = void 0;
exports.$lt = function (x) { return ({
    runtimeInterface: true,
    type: 'number',
    test: function (a) { return a < x; }
}); };
