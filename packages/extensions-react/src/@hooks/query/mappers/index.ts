import {AMapper} from "./abstract";
import {MapperArray} from "./array";
import {MapperBoolean} from "./boolean";
import {MapperDate} from "./date";
import {MapperNumber} from "./number";
import {MapperString} from "./string";
import {MapperUnion} from "./union";
export {AMapper};

export const mappers = {
    get date() {
        return new MapperDate();
    },
    get number() {
        return new MapperNumber();
    },
    get string() {
        return new MapperString();
    },
    get boolean() {
        return new MapperBoolean();
    },

    array: <T extends AMapper<any>>(mapper: T) => new MapperArray(mapper),
    union: <const T>(...values: T[]) => new MapperUnion<T>(...values),
} as const;

export type Mapper = typeof mappers;

export type MapperInfer<T> = {
    [K in keyof T]: T[K] extends AMapper<infer R> ? R : never;
};
