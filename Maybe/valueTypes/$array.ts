import { pipe } from "../../prelude";
import { match } from "../functions/match";
import { $unknown } from "./$unknown";

export const $array = <A>(type_: A) => ({
  runtimeInterface: true,
  test: (a: any) =>
    Array.isArray(a)
      && a.map(item =>
        pipe(
          item,
          match(type_, _ => true),
          match($unknown, _ => false)
        )
      ).every(item => item === true)
}) as unknown as A[]