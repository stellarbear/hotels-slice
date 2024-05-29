export const fromArray = <T, U extends PropertyKey, V = T>(array: T[], fnKey: (e: T) => U, fnValue?: (e: T) => V) => {
    return array.reduce((acc, curr) => {
        const id = fnKey(curr);
        acc[id] = fnValue?.(curr) ?? (curr as any as V);
        return acc;
    }, {} as Record<U, V>);
};