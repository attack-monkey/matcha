import { patternMatch, with_ } from '../index'
import { $string } from '../runtime-interfaces/$string'
import { $nothing } from '../runtime-interfaces/$nothing'

// Create a runtime interface

const $person = {
  name: {
    first: $string
  }
}

// Bind that to a compile time type

type Person = typeof $person

const bob: Person = {
  name: {
    first: 'bob'
  }
}

// And ... Pattern match

const stringOrPerson = patternMatch(
  bob,
  with_($person, person => `${person.name.first} is a person`)
)

// ^^ Note how `stringOrPerson` is type of string | Person.
// If bob matches $person - then a string is returned.
// Otherwise the passed in value (Person) is returned.

// Pattern matching becomes more powerful when used to drive type-cirtainty.
// In the above `a` is an ambiguous union.
// Instead we can drive type-cirtainty by not returning a response to a variable at all.
// Instead we call a function passing in the value of cirtain-type.
// personProgram only fires if `bob` matches `$person` so if personProgram runs then it is with type-cirtainty.

const personProgram = (person: Person) => {
  // this program runs with type cirtainty :D
  console.log(`${person.name.first} is safe`)
}

// Pattern match
patternMatch(
  bob,
  with_($person, personProgram /* this only runs if a match occurs */),
  with_($nothing, _ => console.log('no match'))
)



