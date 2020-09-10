import { Maybe } from "./Maybe/types/Maybe";
declare type MatchFn<A> = (a: Maybe<A>) => Maybe<A>;
export declare const die: (msg: string) => never;
export declare const isNone: (a: any) => boolean;
export declare const isSome: (a: any) => boolean;
export interface PatternMatch {
    <A, B>(a: A, fb: MatchFn<B>): A | B;
    <A, B, C>(a: A, fb: MatchFn<B>, fc: MatchFn<C>): A | B | C;
    <A, B, C, D>(a: A, fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>): A | B | C | D;
    <A, B, C, D, E>(a: A, fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>, fe: MatchFn<E>): A | B | C | D | E;
}
export declare const patternMatch: PatternMatch;
export interface PatternMatchCompose {
    <A, B>(fb: MatchFn<B>): (a: A) => A | B;
    <A, B, C>(fb: MatchFn<B>, fc: MatchFn<C>): (a: A) => A | B | C;
    <A, B, C, D>(fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>): (a: A) => A | B | C | D;
    <A, B, C, D, E>(fb: MatchFn<B>, fc: MatchFn<C>, fd: MatchFn<D>, fe: MatchFn<E>): (a: A) => A | B | C | D | E;
}
export declare const patternMatchCompose: PatternMatchCompose;
export declare const with_: <A, C>(litOrPatial: A, f: import("./Maybe/types/AtoB").AtoB<A, C>) => (c: Maybe<C>) => Maybe<C>;
export {};
