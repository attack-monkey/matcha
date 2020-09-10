import { Maybe } from "../types/Maybe";
import { AtoB } from "../types/AtoB";
declare type Match = <A, C>(litOrPatial: A, f: AtoB<A, C>) => (c: Maybe<C>) => Maybe<C>;
export declare const match: Match;
export {};
