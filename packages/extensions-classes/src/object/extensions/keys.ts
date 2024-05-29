
type OutputKeys<T> = T extends Record<string, any> ? keyof T : unknown;

export const keys = <T extends {}>(src: T): OutputKeys<T>[] => {
    return Object.keys(src) as any;
};
