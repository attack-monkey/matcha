export declare const Maybe: {
    none: any;
    some: any;
    match: <A, C>(litOrPatial: A, f: import("./types/AtoB").AtoB<A, C>) => (c: import("./types/Maybe").Maybe<C>) => import("./types/Maybe").Maybe<C>;
};
