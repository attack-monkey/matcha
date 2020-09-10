interface Union {
    <A, B>(x: [A, B]): A | B;
    <A, B, C>(x: [A, B, C]): A | B | C;
    <A, B, C, D>(x: [A, B, C, D]): A | B | C | D;
    <A, B, C, D, E>(x: [A, B, C, D, E]): A | B | C | D | E;
}
export declare const $union: Union;
export {};
