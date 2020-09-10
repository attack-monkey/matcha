import { patternMatch } from "..";
import { match } from "../Maybe/functions/match";
import { $unknown } from "./$unknown";

interface Union {
  <A, B>(x: [A, B]): A | B,
  <A, B, C>(x: [A, B, C ]): A | B | C
  <A, B, C, D>(x: [A, B, C, D ]): A | B | C | D
  <A, B, C, D, E>(x: [A, B, C, D, E ]): A | B | C | D | E
}
export const $union: Union = (x: any[]) => ({
  runtimeInterface: true,
  test: (a: any) => 
    x.map(item => 
      patternMatch(
        a,
        match(item, _ => true),
        match($unknown, _ => false)
      )
    ).some(item => item === true)
})