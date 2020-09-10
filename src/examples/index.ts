import { patternMatch, with_ } from '../index'
import { $string } from '../runtime-interfaces/$string'
import { $unknown } from '../runtime-interfaces/$unknown'
import { Maybe } from '../Maybe/types/Maybe'
import { $array } from '../runtime-interfaces/$array'
import { $number } from '../runtime-interfaces/$number'

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

// Pattern match
const a = patternMatch(
  bob,
  with_($person, bob => `Name is ${bob.name.first}`),
  with_($array($number), _ => 56)
)
