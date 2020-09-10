import { pipe } from "../prelude";
import { match } from "../Maybe/functions/match";
import { $unknown } from "./$unknown";

export const $record = <A>(type_: A) => ({
  runtimeInterface: true,
  test: (a: any) =>
    typeof a === 'object'
      && Object.keys(a).map(key =>
        pipe(
          a[key],
          match(type_, _ => true),
          match($unknown, _ => false)
        )
      ).every(item => item === true)
}) as unknown as Record<string, A>