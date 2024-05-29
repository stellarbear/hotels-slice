export type Width = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
export type Flex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const from = <T extends number>(as: T | true, defaults: T) =>
    as === true 
        ? defaults
        : as;
