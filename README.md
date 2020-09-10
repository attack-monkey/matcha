# matcha
Pattern Matching for Typescript and Javascript

----

matcha provides powerful pattern matching - inspired by f# and functional programming.

Pattern matching takes a value and matches it against a series of patterns.
The first pattern to match, fires the value (with type inferred from the pattern) into an accompanying function.

So... let's say we have `name`.

We could do something like...

```typescript

patternMatch(
  name,
  with_('garfield', matchedName => `${matchedName} is a cat`)
  with_('odie', matchedName => `${matchedName} is a dog`)
)

```

In the above `matchedName` in both cases is inferred to be a string - even though `name` may be of unknown type.
That's because `matchedName` infers it's type from the pattern.

Pattern Matching can be used to return a value.
The result is the result of the function that fires upon match.
If there is no match, then the original value is returned instead.


```typescript

const name: string = getName()

const a = patternMatch(
  name,
  with_('garfield', matchedName => `${matchedName} is a cat`)
  with_('odie', matchedName => `${matchedName} is a dog`)
)

```

In the above, since the value and both `with_` arms all return a string - the compiler is smart enough to know that the resulting type is always string. Therefore `a` gets an inferred type of string.

If one of the arms returned a `number` then `a` would have an inferred type of `string | number`.

### Literal matching

We've already seen how simple equality matches can be made...

```typescript

const a = 'cat' as unknown

const b = patternMatch(
  a,
  with_('cat', _ => `hello kitty`),
  with_('dog', _ => `hello doggy`)
)

```

But Pattern Matching is far more powerful than that...

### Partial Matching & Destructuring

Objects and arrays can be matched against a partial object / array.

```typescript

const a = {
  name: {
    first: 'johnny',
    last: 'bravo'
  }
}

patternMatch(
  a,
  with_({ name: { first: 'johnny '} }, _ => `matching on first name`)
)

```

Which is particularly useful when used in combination with destructuring

```typescript

patternMatch(
  a,
  with_({ name: { first: 'johnny '} }, ({ name: { first: b }}) => `Hey it's ${b}`)
)

```

### Runtime Interfaces

Special runtime interfaces can be used to match against in place of values...

Here we use `$string` in place of the literal name.


```typescript

const $matchPattern = {
  name: {
    first: $string 
  }
}

patternMatch(
  a,
  with_($matchedPattern, ({ name: { first: b }}) => `${b} is a string`)
)

```

It's also good to point out that a runtime interface automatically binds the correct type to the interface, so `$string` is of type `string`. So when `a` is matched, it gets assigned the type `{ name: { first: string }}`

Runtime interfaces are powerful...

```typescript

const a = [1, 2, 3]

patternMatch(
  a,
  with_($array($number), a => `${a} is an array of numbers`)
)

```

```typescript

patternMatch(
  a,
  with_([1, $number, 3], ([_, b, __]) => `${b} is a number`)
)

```

```typescript

const a = {
  a: [1, 2],
  b: [3, 3, 4],
  c: [1, 5, 99]
}

patternMatch(
  a,
  with_($record($array($number)), a => `A record of arrays of numbers - whoa`)
)

```

```typescript

const a = 'cat' as unknown

console.log(
  patternMatch(
    a,
    with_($lt(100), _ => `< 100`),
    with_($gt(100), _ => `> 100`),
    with_(100, _ => `its 100`),
    with_($unknown, _ => `no idea ... probably a cat`) // Use $unknown as a catch all
  )
)

```

```typescript

const a = 'cat' as string | number

patternMatch(
  a,
  with_($union([$string, $number]), _ => `a is string | number`)
)

```

Runtime interfaces include

- `$string`
- `$number`
- `$boolean`
- `$array([])`
- `$record()`
- `$union([])`
- `$unknown`
- `$nothing` <- Use this to match on undefined & null
- `$lt`
- `$gt`
- `$lte`
- `$gte`

## Roll your own Runtime Interfaces

```typescript

const $even =
  {
    runtimeInterface: true,
    test: (a: number) => a % 2 === 0
  } as unknown as number

const $odd =
  {
    runtimeInterface: true,
    test: (a: number) => a % 2 !== 0
  } as unknown as number

console.log(
  patternMatch(
    101,
    with_($even, _ => `number is even`),
    with_($odd, _ => `number is odd`)
  )
) // number is odd

```
A Runtime interface is an object with the property `runtimeInterface: true`.
This tells the `with` function to treat the value as a Runtime Interface.

Primitive Runtime Interfaces have a `type` property, but more complex ones have a `test` function that determines whether a match is being made.

In both `$odd` and `$even` the subject is piped into the test function and a boolean is returned which determines whether or not the subject matches.

Note that the Runtime Interface object is coerced into the expected type should the path match.