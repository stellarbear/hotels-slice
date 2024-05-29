export const or = <T>(...predicates: ((e: T) => boolean)[]) =>
    (src: T) => predicates.some(p => p(src));

export const and = <T>(...predicates: ((e: T) => boolean)[]) =>
    (src: T) => predicates.every(p => p(src));

export const not = <T>(fn: (src: T) => boolean) =>
    (src: T) => !fn(src);

export const equal = <T>(src: T) =>
    (dst: T) => src === dst;

export const predicate = {
    or,
    and,
    not,
    equal,
};
