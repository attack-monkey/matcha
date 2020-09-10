import { isNone } from ".."

export const $nothing = {
    runtimeInterface: true,
    test: (a: unknown) => isNone(a)
};