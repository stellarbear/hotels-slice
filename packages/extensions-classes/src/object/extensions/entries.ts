type OutputEntries<T> = T extends Record<any, infer U> ? [keyof T, U] : [keyof T, unknown];

export const entries = <T extends {}>(src: T): OutputEntries<T>[] => {
    return Object.entries(src) as any;
};
