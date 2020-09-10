import { Maybe } from "./Maybe/types/Maybe"

export type Thunk = () => void

export type AtoB<A, B> = (a: A) => B

export const die = (msg: string) => { throw new Error(msg) }

export const isNone = (a: any) => a === undefined || a === null

export const isSome = (a: any) => !isNone(a)

type MatchFn<A> = (a: Maybe<A>) => Maybe<A>

export interface Pipe {
  <A, B>(a: A, fb: MatchFn<B>): A | B
  <A, B, C>(a: A, fb: MatchFn<B>, fc: MatchFn<C>): A | B | C
  <A, B, C, D>(a: A, fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>): A | B | C | D
  <A, B, C, D, E>(a: A, fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>, fe: MatchFn<E>): A | B | C | D | E
}

export const pipe: Pipe = (a: any, b: any, c?: any, d?: any, e?: any) => {
  const ba = b ? b(a) : a
  const cba = c ? c(ba) : ba
  const dcba = d ? d(cba) : cba
  const edcba = e ? e(dcba) : dcba
  return edcba?.done === true
    ? edcba.thunk()
    : edcba
}

export interface Compose {
  <A, B>(fb: AtoB<A, B>): (a: A ) => B
  <A, B, C>(fb: AtoB<A, B>, fc: AtoB<B, C>): (a: A) => B | C
  <A, B, C, D>(fb: AtoB<A, B>, fc: AtoB<B, C>, fd: AtoB<C, D>): (a: A) => B | C | D
  <A, B, C, D, E>(fb: AtoB<A, B>, fc: AtoB<B, C>, fd: AtoB<C, D>, fe: AtoB<D, E>): (a: A) => B | C | D | E
}
export const compose: Compose = (b: any, c?: any, d?: any, e?: any) => (a: any) => pipe(a, b, c, d, e)