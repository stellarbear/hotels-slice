export const sequence = <T = number>(count: number, map?: (i: number) => T) => {
    return Array.from(new Array(count), (_, i) => map ? map(i) : i as any as T);
};
