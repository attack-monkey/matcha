import { Resolve } from "./Resolve"
import { Reject } from "./Reject"

export type Executor<A> = (resolve: Resolve<A>, reject?: Reject) => void