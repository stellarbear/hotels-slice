const defaultComparer = (e1: any, e2: any) => e1 === e2;

export const toggle = <T>(array: T[], entry: T, comparer: (e1: T, e2: T) => boolean = defaultComparer) => {
    const filtered = array.filter(e => !comparer(e, entry));

    return filtered.length === array.length
        ? [...array, entry]
        : filtered;
};
