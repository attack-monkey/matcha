declare type Thunk = () => void;
export declare type Done = {
    done: true;
    thunk: Thunk;
};
export declare const Done: Done;
export {};
