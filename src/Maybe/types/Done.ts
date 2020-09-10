type Thunk = () => void
export type Done = { done: true, thunk: Thunk }
export const Done: Done = { done: true, thunk: () => {} }