export const useCombine =
    <T extends (...args: any[]) => any>(event?: T) =>
        (cb: T) =>
            (...args: Parameters<T>) => {
                cb(...args);
                return event?.(...args);
            };
