/**
 * @deprecated since version 2.0.0
 */
export const toMap = <T, U extends PropertyKey>(array: T[], fn: (e: T) => U) => {
    return array.reduce((acc, curr) => {
        const id = fn(curr);
        acc.set(id, curr);
        return acc;
    }, new Map<U, T>);
};

/**
 * @deprecated since version 2.0.0
 */
export const toMapArray = <T, U extends PropertyKey>(array: T[], fn: (e: T) => U) => {
    return array.reduce((acc, curr) => {
        const id = fn(curr);
        if (!acc.has(id)) {
            acc.set(id, []);
        }
        acc.get(id)?.push(curr);

        return acc;
    }, new Map<U, T[]>);
};
