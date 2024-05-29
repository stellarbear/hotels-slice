/* eslint-disable max-len */
export const isString = (src: any): src is string => typeof src === "string";
export const isBoolean = (src: any): src is boolean => typeof src === "boolean";
export const isFunction = (src: any): src is (...args: any[]) => any => typeof src === "function";
export const isNull = (src: any): src is null => src === null;
export const isUndefined = (src: any): src is undefined => src === undefined;
export const isDefined = <T>(src: T | null | undefined): src is T => !(isNull(src) || isUndefined(src));
