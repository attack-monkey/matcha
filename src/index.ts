import { Maybe } from "./Maybe/types/Maybe"
import { match } from "./Maybe/functions/match"

type MatchFn<A> = (a: Maybe<A>) => Maybe<A>

export const die = (msg: string) => { throw new Error(msg) }

export const isNone = (a: any) => a === undefined || a === null

export const isSome = (a: any) => !isNone(a)

export interface PatternMatch {
  <A, B>(a: A, fb: MatchFn<B>): A | B
  <A, B, C>(a: A, fb: MatchFn<B>, fc: MatchFn<C>): A | B | C
  <A, B, C, D>(a: A, fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>): A | B | C | D
  <A, B, C, D, E>(a: A, fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>, fe: MatchFn<E>): A | B | C | D | E
}

export const patternMatch: PatternMatch = (a: any, b: any, c?: any, d?: any, e?: any) => {
  const ba = b ? b(a) : a
  const cba = c ? c(ba) : ba
  const dcba = d ? d(cba) : cba
  const edcba = e ? e(dcba) : dcba
  return edcba?.done === true
    ? edcba.thunk()
    : edcba
}

export interface PatternMatchCompose {
  <A, B>(fb: MatchFn<B>): (a: A ) => A | B
  <A, B, C>(fb: MatchFn<B>, fc: MatchFn<C>): (a: A) => A | B | C
  <A, B, C, D>(fb: MatchFn<B>, fc:MatchFn<C>, fd: MatchFn<D>): (a: A) => A | B | C | D
  <A, B, C, D, E>(fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>, fe: MatchFn<E>): (a: A) => A | B | C | D | E
}
export const patternMatchCompose: PatternMatchCompose = (b: any, c?: any, d?: any, e?: any) => (a: any) => patternMatch(a, b, c, d, e)

export const with_ = match