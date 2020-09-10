export const $lt = (x: number) => (
  {
    runtimeInterface: true,
    type: 'number',
    test: (a: number) => a < x
  }
) as unknown as number