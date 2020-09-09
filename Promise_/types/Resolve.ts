import { PromiseValue } from "./PromiseValue";

export type Resolve<A> = (value: PromiseValue<A>) => void