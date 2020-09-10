# matcha
Pattern Matching for Typescript and Javascript

----

matcha provides powerful pattern matching - inspired by f# and functional programming.

### Literal matching

Firstly simple equality matches can be made...

```typescript

const a = 'cat' as unknown

const b = patternMatch(
  a,
  with_('cat', _ => `hello kitty`),
  with_('dog', _ => `hello doggy`)
)

```

### Partial Matching & Destructuring

Secondly partial objects and arrays can be matched against an object / array.

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

```typescript

patternMatch(
  a,
  with_({ name: { first: $string }}, ({ name: { first: b }}) => `${b} is a string`)
)

```

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
- `$array()`
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