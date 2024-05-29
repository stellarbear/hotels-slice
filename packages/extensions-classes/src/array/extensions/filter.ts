type Guard<T> = (src: any) => src is T;

export const filter = <T>(of: Guard<T>) => {
    return (array: unknown[]) => array.filter(of) as T[];
};
