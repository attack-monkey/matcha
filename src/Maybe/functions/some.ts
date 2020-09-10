
import { Maybe } from "../types/Maybe";
import { Done } from "../valueTypes/Done";
import { AtoB } from "../types/AtoB";

type Some = <A>(f: AtoB<A, any>) => (a: Maybe<A>) => Maybe<A>
export const some: Some = f => a => {
  return a === undefined || a === null || (a as Done)?.done === true
    ? a
    : { done: true as true, thunk: () => f(a as any) }
}