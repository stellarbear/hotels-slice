/* eslint-disable max-len */
import {Guard, isArray} from "./base";

export function isUnion<T1>(of1: Guard<T1>): (src: any) => src is T1;
export function isUnion<T1, T2>(of1: Guard<T1>, of2: Guard<T2>): (src: any) => src is T1 | T2;
export function isUnion<T1, T2, T3>(of1: Guard<T1>, of2: Guard<T2>, of3: Guard<T3>): (src: any) => src is T1 | T2 | T3;
export function isUnion<T1, T2, T3, T4>(of1: Guard<T1>, of2: Guard<T2>, of3: Guard<T3>, of4: Guard<T4>): (src: any) => src is T1 | T2 | T3 | T4;
export function isUnion(...guards: Guard<any>[]): (src: any) => src is any {
    return (src: any): src is any => guards.some(guard => guard(src));
}

export function isIntersection<T1>(of1: Guard<T1>): (src: any) => src is T1;
export function isIntersection<T1, T2>(of1: Guard<T1>, of2: Guard<T2>): (src: any) => src is T1 & T2;
export function isIntersection<T1, T2, T3>(of1: Guard<T1>, of2: Guard<T2>, of3: Guard<T3>): (src: any) => src is T1 & T2 & T3;
export function isIntersection<T1, T2, T3, T4>(of1: Guard<T1>, of2: Guard<T2>, of3: Guard<T3>, of4: Guard<T4>): (src: any) => src is T1 & T2 & T3 & T4;
export function isIntersection(...guards: Guard<any>[]): (src: any) => src is any {
    return (src: any): src is any => guards.every(guard => guard(src));
}

export function isTuple<T1>(of1: Guard<T1>): (src: any) => src is T1;
export function isTuple<T1, T2>(of1: Guard<T1>, of2: Guard<T2>): (src: any) => src is [T1, T2];
export function isTuple<T1, T2, T3>(of1: Guard<T1>, of2: Guard<T2>, of3: Guard<T3>): (src: any) => src is [T1, T2, T3];
export function isTuple<T1, T2, T3, T4>(of1: Guard<T1>, of2: Guard<T2>, of3: Guard<T3>, of4: Guard<T4>): (src: any) => src is [T1, T2, T3, T4];
export function isTuple(...guards: Guard<any>[]): (src: any) => src is any {
    return (src: any): src is any => {
        if (!isArray(src)) {
            return false;
        }

        return guards.every((guard, index) => guard(src[index]));
    };
}

export const isNarrowed = <T>(of: Guard<T>, ...args: ((e: T) => boolean)[]) => (src: any): src is T => {
    if (!of(src)) {
        return false;
    }

    return args.every(arg => arg(src));
};
