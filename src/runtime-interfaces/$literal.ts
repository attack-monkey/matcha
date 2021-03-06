import { patternMatch } from "..";
import { match } from "../Maybe/functions/match";
import { $unknown } from "./$unknown";

export const $literal = <A>(x: A) => ({
  runtimeInterface: true,
  test: (a: any) => 
    patternMatch(
      a,
      match(x, _ => true),
      match($unknown, _ => false)
    )
}) as unknown as A