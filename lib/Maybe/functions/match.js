"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
var isPrimitive = function (a) { return typeof a !== 'object'; };
var isRuntimeInterface = function (a) { return a.runtimeInterface; };
var matches = function (litOrPartial, c) {
    var matchingAlg = function (litOrPartial, c) {
        try {
            // test runtime collections of primitives
            isRuntimeInterface(litOrPartial)
                && litOrPartial.test
                && litOrPartial.test(c)
                ? litOrPartial // assoc test passed
                : isRuntimeInterface(litOrPartial)
                    && litOrPartial.test
                    && litOrPartial.test(c) === false // assoc test fail
                    ? (function () { throw 'mismatch'; })()
                    // test runtime primitives
                    : isRuntimeInterface(litOrPartial) && typeof c === litOrPartial.type
                        ? litOrPartial
                        : isRuntimeInterface(litOrPartial) && typeof c !== litOrPartial.type
                            ? (function () { throw 'mismatch'; })()
                            // test primitive literals
                            : isPrimitive(litOrPartial) && litOrPartial === c
                                ? litOrPartial
                                : isPrimitive(litOrPartial) && litOrPartial !== c
                                    ? (function () { throw 'mismatch'; })()
                                    // Recursion - either array or object
                                    : Array.isArray(litOrPartial)
                                        ? litOrPartial.map(function (item, i) { return matchingAlg(item, c[i]); })
                                        : typeof litOrPartial === 'object'
                                            ? Object.keys(litOrPartial).reduce(function (ac, cv) {
                                                return matchingAlg(litOrPartial[cv], c[cv]);
                                            }, {})
                                            // Otherwise cannot match
                                            : (function () { throw 'mismatch'; })();
            return true;
        }
        catch (e) {
            throw 'mismatch';
        }
    };
    try {
        matchingAlg(litOrPartial, c);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.match = function (litOrPartial, f) { return function (c) {
    var _a;
    return ((_a = c) === null || _a === void 0 ? void 0 : _a.done) === true || !matches(litOrPartial, c)
        ? c
        : { done: true, thunk: function () { return f(c); } };
}; };
