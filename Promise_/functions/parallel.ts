export const parallel = <A>(a: A) => {
  return Promise.all(a as unknown as any[]) as any
}