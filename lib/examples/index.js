"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var _string_1 = require("../runtime-interfaces/$string");
var _nothing_1 = require("../runtime-interfaces/$nothing");
// Create a runtime interface
var $person = {
    name: {
        first: _string_1.$string
    }
};
var bob = {
    name: {
        first: 'bob'
    }
};
// And ... Pattern match
var stringOrPerson = index_1.patternMatch(bob, index_1.with_($person, function (person) { return person.name.first + " is a person"; }));
// ^^ Note how `stringOrPerson` is type of string | Person.
// If bob matches $person - then a string is returned.
// Otherwise the passed in value (Person) is returned.
// Pattern matching becomes more powerful when used to drive type-cirtainty.
// In the above `a` is an ambiguous union.
// Instead we can drive type-cirtainty by not returning a response to a variable at all.
// Instead we call a function passing in the value of cirtain-type.
// personProgram only fires if `bob` matches `$person` so if personProgram runs then it is with type-cirtainty.
var personProgram = function (person) {
    // this program runs with type cirtainty :D
    console.log(person.name.first + " is safe");
};
// Pattern match
index_1.patternMatch(bob, index_1.with_($person, personProgram /* this only runs if a match occurs */), index_1.with_(_nothing_1.$nothing, function (_) { return console.log('no match'); }));
