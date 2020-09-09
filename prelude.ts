export type Thunk = () => void

export type AtoB<A, B> = (a: A) => B

export const die = (msg: string) => { throw new Error(msg) }

export const pretty = (a: any): string => JSON.stringify(a, null, 2)

export const deRef = <A>(a: A | Readonly<A>): A =>
  Array.isArray(a)
    ? a.map(item => deRef(item)) as any as A
    : typeof a === 'object'
      ? Object.keys(a).reduce((ac: A, key: string) => ({ ...ac, [key]: deRef((a as any)[key]) }), {} as A)
      : (() => {
        const newItem = a // a is a primitive - so this will create a new primitive
        return newItem as A
      })()
      
export const isNone = (a: any) => a === undefined || a === null

export const isSome = (a: any) => !isNone(a)

export const freeze = <A>(a: A): Readonly<A> => Object.freeze(a)

export interface Pipe {
  <A, B>(a: A, fb: AtoB<A, B>): B
  <A, B, C>(a: A, fb: AtoB<A, B>, fc: AtoB<B, C>): C
  <A, B, C, D>(a: A, fb: AtoB<A, B>, fc: AtoB<B, C>, fd: AtoB<C, D>): D
  <A, B, C, D, E>(a: A, fb: AtoB<A, B>, fc: AtoB<B, C>, fd: AtoB<C, D>, fe: AtoB<D, E>): E
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
  <A, B, C>(fb: AtoB<A, B>, fc: AtoB<B, C>): (a: A) => C
  <A, B, C, D>(fb: AtoB<A, B>, fc: AtoB<B, C>, fd: AtoB<C, D>): (a: A) => D
  <A, B, C, D, E>(fb: AtoB<A, B>, fc: AtoB<B, C>, fd: AtoB<C, D>, fe: AtoB<D, E>): (a: A) => E
}
export const compose: Compose = (b: any, c?: any, d?: any, e?: any) => (a: any) => pipe(a, b, c, d, e)