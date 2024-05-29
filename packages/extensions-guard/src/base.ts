export type Guard<T> = (src: any) => src is T;

export const isAny = (src: any): src is any => true;
export const isString = (src: any): src is string => typeof src === "string";
export const isDate = (src: any): src is Date => typeof src?.getMonth === "function";
export const isNumber = (src: any): src is number => typeof src === "number";
export const isBoolean = (src: any): src is boolean => typeof src === "boolean";
export const isFunction = (src: any): src is (...args: any[]) => any => typeof src === "function";
export const isNull = (src: any): src is null => src === null;
export const isUndefined = (src: any): src is undefined => src === undefined;
export const isDefined = <T>(src: T | null | undefined): src is T => !(isNull(src) || isUndefined(src));

export const isConst = <const T>(of: T) => (src: any): src is T => src === of;

export const isObject = (src: any): src is Record<string, any> => src !== null && typeof src === "object";
export const isObjectOf = <T>(of: Guard<T>) => (src: any): src is Record<string, T> => {
    if (isObject(src)) {
        return Object.values(src).every(of);
    }

    return false;
};

export const isArray = (src: any): src is any[] => Array.isArray(src);
export const isArrayOf = <T>(of: Guard<T>) => (src: any): src is T[] => {
    if (isArray(src)) {
        return src.every(of);
    }

    return false;
};

export const isNot = <T, U>(of: Guard<T>) => (src: U | T): src is U => !of(src);
export const isInRecord = <T extends Record<string, any>>(record: T) => (src: any): src is keyof T =>
    src in record;
export const isInSet = <U, T extends Set<U>>(set: T) => (src: any): src is U =>
    set.has(src);

export const isEnum = <T>(enumerated: T) => (src: any): src is T[keyof T] =>
    Object.values(enumerated as any).includes(src as T[keyof T]);

export const isJson = <T>(src: any, of: Guard<T>, defaults: T) => {
    try {
        const parsed = JSON.parse(src);
        if (of(parsed)) {
            return parsed;
        } else {
            return defaults;
        }
    } catch {
        return defaults;
    }
};
