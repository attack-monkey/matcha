export const $lte = (x: number) => (
  {
    runtimeInterface: true,
    test: (a: number) => a <= x
  }
) as unknown as number