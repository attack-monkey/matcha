import { Maybe } from "../types/Maybe"
import { Done } from "../valueTypes/Done"
import { AtoB } from "../types/AtoB"

const isPrimitive = <A>(a: A): boolean => typeof a !== 'object'

const isRuntimeInterface = (a: any) => a.runtimeInterface

const matches = <A>(litOrPartial: A, c: any) => {
  const matchingAlg = <A>(litOrPartial: A, c: any) => {
    try {
      // test runtime collections of primitives
      isRuntimeInterface(litOrPartial)
        && (litOrPartial as any).test
        && (litOrPartial as any).test(c)
          ? litOrPartial // assoc test passed
          : isRuntimeInterface(litOrPartial)
            && (litOrPartial as any).test
            && (litOrPartial as any).test(c) === false // assoc test fail
              ? (() => { throw 'mismatch' })()
              // test runtime primitives
              : isRuntimeInterface(litOrPartial) && typeof c === (litOrPartial as any).type
                ? litOrPartial
                : isRuntimeInterface(litOrPartial) && typeof c !== (litOrPartial as any).type
                  ? (() => { throw 'mismatch' })()
                    // test primitive literals
                    : isPrimitive(litOrPartial) && litOrPartial === c
                    ? litOrPartial
                    : isPrimitive(litOrPartial) && litOrPartial !== c
                      ? (() => { throw 'mismatch' })()
                      // Recursion - either array or object
                      : Array.isArray(litOrPartial)
                        ? litOrPartial.map((item: any, i: number) => matchingAlg(item, c[i]))
                        : typeof litOrPartial === 'object'
                          ? Object.keys(litOrPartial as any).reduce((ac: any, cv: string) => {
                              return matchingAlg((litOrPartial as any)[cv], c[cv])
                            }, {} as any as A)
                          // Otherwise cannot match
                          : (() => { throw 'mismatch' })()
      return true  
    } catch(e) {
      throw 'mismatch'
    }
  }
  
  try{
    matchingAlg(litOrPartial, c)
    return true
  } catch (e) {
    return false
  }
}

type Match = <A, C>(litOrPatial: A, f: AtoB<A, any>) => (c: Maybe<C>) => Maybe<C>

export const match: Match = (litOrPartial, f) => c => {
  return (c as Done)?.done === true || !matches(litOrPartial, c)
    ? c
      : { done: true as true, thunk: () => f(c as any) }
}