/**
 * @deprecated since version 2.0.0
 */
export const toRecord = <T, U extends PropertyKey, V = T>(array: T[], fnKey: (e: T) => U, fnValue?: (e: T) => V) => {
    return array.reduce((acc, curr) => {
        const id = fnKey(curr);
        acc[id] = fnValue?.(curr) ?? (curr as any as V);
        return acc;
    }, {} as Record<U, V>);
};
/**
 * @deprecated since version 2.0.0
 */
export const toRecordArray = <T, U extends PropertyKey>(array: T[], fn: (e: T) => U) => {
    return array.reduce((acc, curr) => {
        const id = fn(curr);
        if (!(id in acc)) {
            acc[id] = [];
        }
        acc[id].push(curr);
        return acc;
    }, {} as Record<U, T[]>);
};
