import { Executor } from "../types/Executor"

export const promise = <A>(f: Executor<A>) => new Promise(f)