import { Maybe } from "../types/Maybe"

type None = <A>(f: (a: undefined) => any) => (self: Maybe<A>) => Maybe<A>
export const none: None = f => self => 
  self === undefined || self === null
    ? { done: true as true, thunk: () => f(self as undefined) }
    : self